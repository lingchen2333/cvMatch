from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langchain import hub
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains.retrieval import create_retrieval_chain
from langchain_pinecone import PineconeVectorStore
from pydantic import BaseModel
from typing import List, Optional
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
    allow_origins=[os.environ["FRONTEND_URL"],],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ImprovementSuggestion(BaseModel):
    suggestion: str
    example: str

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
    retrieved_docs = await retriever.aget_relevant_documents(combined_query)
    
    # Combine the documents into context
    context_text = "\n\n".join([doc.page_content for doc in retrieved_docs])

    # 5. Create the CV analysis prompt with retrieved context
    template = """
    Analyze a candidate's CV against a job description to assess the match quality. Use the provided context from relevant resources to enhance your analysis. Interpret qualifications and experience semantically—if a qualification is satisfied using different wording or phrasing in the CV, consider it fulfilled and do not mark it as missing. Produce a JSON object with the following fields:
    
    - highlighted_matches: List specific keywords, phrases, or experiences from the CV that directly align with the requirements in the job description.
    - missing_areas: List any required qualifications, skills, or experiences from the job description that are not present or reasonably inferred in the CV.
    - improvement_suggestions: Offer general, CV-agnostic improvement suggestions (structure, clarity, tone, formatting). Each suggestion must include a concrete, personalized example derived from the candidate's own CV content. Use the provided context to suggest more relevant improvements.
    - score: An integer (0–100) indicating how well the CV matches the job description.
    
    Instructions:
    
    - Focus on semantic understanding; avoid penalizing for different wording if the meaning is clear.
    - Use the provided context to suggest more relevant and specific improvements.
    - Explanations should be concise.
    - Output must be valid JSON only, with no extra commentary.
    - Think step-by-step: First identify direct matches and fulfillments; then systematically check for missing job criteria; finally, review the CV structure to suggest concrete improvements using the context.
    - Persist until all above objectives are met before finalizing the answer.
    
    Output Format:
    Return a single JSON object with the keys: highlighted_matches (list), missing_areas (list), improvement_suggestions (list of objects with 'suggestion' and 'example' fields), and score (integer). Do not wrap the JSON in a code block or include any extra text.
    
    Example (for illustration only—the real analysis will require information from actual CV and job descriptions):
    
    {{
      "highlighted_matches": [
        "Project management experience with agile teams",
        "Certification: AWS Solutions Architect",
        "5+ years in software engineering roles"
      ],
      "missing_areas": [
        "Experience with machine learning frameworks",
        "Fluency in Spanish"
      ],
      "improvement_suggestions": [
        {{
          "suggestion": "Quantify your achievements wherever possible to demonstrate the impact of your work."
          "example": "E.g., Machine Learning Model for XYZ - Developed a machine learning model using Python and Scikit-learn to predict XYZ. The model achieved an accuracy of 85%."
        }},
        {{
          "suggestion": "Consistent formatting of job titles and dates.",
          "example": "E.g., Standardize employment date format—use 'Jan 2020 – Dec 2022' throughout CV."
        }}
      ],
      "score": 82
    }}
    
    (Remember: In real answers, the above lists and suggestions should use information from the actual CV and job description provided.)
    
    Important Reminder:
    - Interpret requirements semantically and avoid redundant missing_areas.
    - Provide improvement suggestions with explicit, personalized examples based on the CV content and context.
    - Only output a single, valid JSON object with the specified structure.
    
    CV: {cv_text}
    
    Job Description: {job_description}
    
    Relevant Context from Resources: {context_text}
    """

    prompt = ChatPromptTemplate.from_template(template=template)

    # 6. Create and run the combined chain
    analysis_chain = prompt | llm

    result = await analysis_chain.ainvoke({
        "cv_text": cv_text,
        "job_description": job_description,
        "context_text": context_text
    })

    # 7. Parse the LLM's JSON output
    import json

    try:
        data = json.loads(result.content)
        # Validate and coerce types
        return MatchResult(
            highlighted_matches=data.get("highlighted_matches", []),
            missing_areas=data.get("missing_areas", []),
            improvement_suggestions=data.get("improvement_suggestions", []),
            score=int(data.get("score", 0)),
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"LLM output parsing error: {e}\nRaw output: {result.content}",
        )

port = 8001 
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
