from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import os
import tempfile
import PyPDF2
import uvicorn

from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class MatchResult(BaseModel):
    highlighted_matches: List[str]
    missing_areas: List[str]
    improvement_suggestions: List[str]
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

    # 2. LangChain logic
    llm = ChatOpenAI(
        model="gpt-4",  # or "gpt-3.5-turbo"
        temperature=0.2,
    )

    prompt = ChatPromptTemplate.from_messages([
        ("system",
        """You are an expert career coach and recruiter.
        Your task is to analyze how well a candidate's CV matches a job description.
        Return a JSON object with:
        - highlighted_matches: a list of specific keywords, phrases, or experiences from the CV that align with the job description.
        - missing_areas: a list of required qualifications, skills, or experiences mentioned in the job description but absent in the CV.
        - improvement_suggestions: a list of actionable and tailored to the job.
        - score: an integer from 0 to 100 representing the overall match quality.
        Keep explanations short and clear.
        Only return valid JSON, no extra commentary.
        """),
        ("user",
        f"""CV:
        {cv_text}

        Job Description:
        {job_description}

        Please analyze and return the result as specified above.
        """)
    ])


    # Run the chain
    chain = prompt | llm
    result = await chain.ainvoke({})

    # Parse the LLM's JSON output
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


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
