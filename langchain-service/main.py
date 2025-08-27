from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langchain_pinecone import PineconeVectorStore
from pydantic import BaseModel
from typing import List
import os
import tempfile
import PyPDF2
import uvicorn

from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.prompts import ChatPromptTemplate

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ["FRONTEND_URL"],
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)


class ImprovementSuggestion(BaseModel):
    suggestion: str
    example: str

class CVAnalysis(BaseModel):
    highlighted_matches: List[str]
    missing_areas: List[str]
    improvement_suggestions: List[ImprovementSuggestion]
    score: int



class MatchResult(BaseModel):
    highlighted_matches: List[str]
    missing_areas: List[str]
    improvement_suggestions: List[ImprovementSuggestion]
    score: int


@app.post("/analyze", response_model=MatchResult)
async def analyze_cv(cv: UploadFile = File(...), job_description: str = Form(...)):
    # 1. Extract text from PDF
    if cv.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    try:
        with tempfile.NamedTemporaryFile(delete=False) as tmp:
            tmp.write(await cv.read())
            tmp_path = tmp.name
        with open(tmp_path, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            cv_text = "\n".join(page.extract_text() or "" for page in reader.pages)
        os.remove(tmp_path)
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to extract text from PDF: {e}"
        )

    # 2. Initialize LangChain components
    llm = ChatOpenAI(
        model="gpt-4o",
        temperature=0,
    )
    structured_llm = llm.with_structured_output(schema=CVAnalysis)

    embeddings = OpenAIEmbeddings()
    vectorstore = PineconeVectorStore(
        index_name=os.environ["INDEX_NAME"], embedding=embeddings
    )

    # 3. Get relevant documents using retriever
    combined_query = """
    CV content:
    {cv_text}

    Job description:
    {job_description}

    Task: Find resources that help improve this CV for this job.
    """

    # Use the retriever directly to get documents, then combine them
    retriever = vectorstore.as_retriever()
    retrieved_docs = await retriever.ainvoke(combined_query)

    # Combine the documents into context
    context_text = "\n\n".join([doc.page_content for doc in retrieved_docs])

    # 5. Create the CV analysis prompt with retrieved context
    template = """
    You are an experienced career coach.
    Analyze a candidate's CV against a job description to assess the match quality. Use the provided context from relevant resources to enhance your analysis. Interpret qualifications and experience semantically—if a qualification is satisfied using different wording or phrasing in the CV, consider it fulfilled and do not mark it as missing. Produce a JSON object with the following fields:
    
    - highlighted_matches: List specific keywords, phrases, or experiences from the CV that directly align with the requirements in the job description.
    - missing_areas: List any required qualifications, skills, or experiences from the job description that are not present or reasonably inferred in the CV.
    - improvement_suggestions: A list of suggestions. Each suggestion must have:
        - suggestion: A specific and actionable recommendation for improving the CV to better match the job description. Do not just repeat the missing skill; instead, suggest how to demonstrate it effectively (e.g., "Show how you applied X skill in a recent project" or "Add measurable outcomes for Y").
        - example: A concrete example of what the candidate could add or change in their CV.
        Include structural and phrasing improvements if needed (e.g., "Reorganize sections for clarity," "Make achievements more quantifiable," "Avoid vague statements").
    - score: An integer (0–100) indicating how well the CV matches the job description.
    
    Instructions:
    
    - Focus on semantic understanding; avoid penalizing for different wording if the meaning is clear.
    - Use the provided context to suggest more relevant and specific improvements.
    - Explanations should be concise.
    - Output must be valid JSON only, with no extra commentary.
    - Think step-by-step: First identify direct matches and fulfillments; then systematically check for missing job criteria; finally, review the CV structure to suggest concrete improvements using the context.
    - Persist until all above objectives are met before finalizing the answer.
    - Return only valid JSON. No extra text, no markdown.
    
    
    CV: {cv_text}
    
    Job Description: {job_description}
    
    Relevant Context from Resources: {context_text}
    """

    prompt = ChatPromptTemplate.from_template(template=template)

    # 6. Create and run the combined chain
    analysis_chain = prompt | structured_llm

    result = await analysis_chain.ainvoke(
        {
            "cv_text": cv_text,
            "job_description": job_description,
            "context_text": context_text,
        }
    )

    return result




port = 8001
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
