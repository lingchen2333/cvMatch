# cvMatch

cvMatch is a full-stack application designed to help users match their CVs to job descriptions, track job applications, and receive actionable feedback for improvement. The project consists of three main components:

- **Frontend**: React + Vite SPA
- **Backend**: Spring Boot REST API
- **AI Service**: Python FastAPI service using LangChain and OpenAI with RAG (Retrieval-Augmented Generation)

---

## 🌐 Live Demo

🔗 [https://match-cv.netlify.app](https://match-cv.netlify.app/)

> ⚠️ **Note**: The [Springboot backend](https://cvmatch-backend.onrender.com) and [langchain service](https://cvmatch.onrender.com) are hosted on Render using the free tier, which means it may take **2 min to spin up** after a period of inactivity. You may notice a short delay on the first request — this is expected behavior on free-tier Render services.

---

## Project Structure

```
cv-match/
│
├── frontend-react/        # React + Vite frontend
├── backend-spring/        # Spring Boot backend API
├── langchain-service/     # Python FastAPI AI microservice
│   ├── cv_examples_and_guides/  # Knowledge base for RAG
│   ├── main.py           # FastAPI application with RAG
│   └── ingestion.py      # Document ingestion script
```

---

## Features

### 1. CV Analysis (AI Service with RAG)

- Upload a CV (PDF) and a job description.
- The service uses **Retrieval-Augmented Generation (RAG)** to enhance CV analysis:
  - Retrieves relevant CV writing guides and examples from a knowledge base
  - Combines retrieved context with semantic analysis using OpenAI (via LangChain)
  - Provides more accurate and contextual improvement suggestions
- Returns:
  - Highlighted matches (skills/experience found)
  - Missing areas (requirements not found)
  - Personalized improvement suggestions (enhanced by RAG context)
  - A match score (0-100)

### 2. RAG Implementation

The AI service implements a sophisticated RAG system for enhanced CV analysis:

#### Knowledge Base

- **Document Collection**: CV writing guides, examples, and best practices stored in `cv_examples_and_guides/`
- **Document Types**: PDFs and text files containing:
  - CV writing guidelines and templates
  - Action words and power verbs
  - Gap explanation strategies
  - Undergraduate CV examples
  - Postgraduate CV examples
  - Postgraduate Researcher CV examples

#### Vector Database

- **Pinecone Vector Store**: Stores document embeddings for efficient retrieval
- **OpenAI Embeddings**: Uses OpenAI's embedding model for semantic vectorization
- **Chunking Strategy**: Documents split into 1000-character chunks with 200-character overlap

#### Retrieval Process

1. **Query Construction**: Combines CV content and job description into a semantic search query
2. **Document Retrieval**: Uses vector similarity search to find relevant guidance documents
3. **Context Integration**: Retrieved documents provide context for more informed analysis
4. **Enhanced Suggestions**: Improvement suggestions leverage retrieved best practices and examples

#### Setup and Maintenance

```bash
# Ingest documents into vector database
cd langchain-service
python ingestion.py

# Required environment variables
PINECONE_API_KEY=your_pinecone_key
PINECONE_INDEX_NAME=your_index_name
OPENAI_API_KEY=your_openai_key
```

### 3. Job Application Tracking (Backend)

- User authentication (JWT-based, with refresh tokens)
- CRUD for job applications:
  - Add, update, delete, and list applications
  - Filter and sort by status, date, etc.
- Status management (custom statuses for applications)
- Analytics endpoints:
  - Application counts by status
  - Monthly application trends
  - Sankey diagram data for application flow

### 4. Frontend

- Modern React SPA (Vite)
- User login and registration
- Dashboard for managing and tracking job applications
- CV analysis interface
- Visualizations for application analytics

---

## Getting Started

### Prerequisites

- Node.js (for frontend)
- Python 3.9+ (for AI service)
- Java 17+ and Maven (for backend)
- OpenAI API key (for AI service)
- Pinecone API key and index (for RAG vector database)

### Setup

#### 1. Frontend

```bash
cd frontend-react
npm install
npm run dev
```

#### 2. Backend

```bash
cd backend-spring
./mvnw spring-boot:run
```

#### 3. AI Service

```bash
cd langchain-service
pip install pipenv
pipenv install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys:
# - OPENAI_API_KEY
# - PINECONE_API_KEY
# - PINECONE_INDEX_NAME

# Ingest documents into vector database (first time setup)
python ingestion.py

# Start the service
pipenv run python main.py
```

---

## API Overview

### Backend (Spring Boot)

- `/api/auth/login` — User login
- `/api/auth/refresh-token` — Refresh JWT
- `/api/users` — Get or update authenticated user
- `/api/users/{userId}` — Get user by ID
- `/api/applications` — CRUD for job applications
- `/api/applications/counts-by-status` — Application status analytics
- `/api/applications/monthly-count` — Monthly application analytics
- `/api/applications/sankey-data` — Sankey diagram data
- `/api/statuses` — Get all application statuses

### AI Service (FastAPI with RAG)

- `POST /analyze` — Analyze a CV (PDF) against a job description using RAG-enhanced analysis
  - **Input**: CV file (PDF) and job description text
  - **Process**: Retrieves relevant CV guidance documents, combines with semantic analysis
  - **Output**: Enhanced analysis with contextual improvement suggestions

---

## Environment Variables

Each service uses its own `.env` file for configuration:

### AI Service (langchain-service/.env)

```
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=your_pinecone_index_name
```

### Backend (backend-spring/.env)

```
DATASOURCE_URL=your_database_url
DATASOURCE_USER=your_database_user
DATASOURCE_PASSWORD=your_database_password
AUTH_TOKEN_JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

### Frontend (frontend-react/.env)

```
VITE_API_URL=http://localhost:8080/api/v1
VITE_LANGCHAIN_API_URL=http://localhost:8001
```

---

## License

[MIT](LICENSE)

---

## Acknowledgements

- [LangChain](https://github.com/langchain-ai/langchain)
- [OpenAI](https://openai.com/)
- [Pinecone](https://www.pinecone.io/) - Vector database for RAG
- [Spring Boot](https://spring.io/projects/spring-boot)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [FastAPI](https://fastapi.tiangolo.com/) - Python web framework for AI service
