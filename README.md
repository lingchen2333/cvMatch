# cvMatch

cvMatch is a full-stack application designed to help users match their CVs to job descriptions, track job applications, and receive actionable feedback for improvement. The project consists of three main components:

- **Frontend**: React + Vite SPA
- **Backend**: Spring Boot REST API
- **AI Service**: Python FastAPI service using LangChain and OpenAI

---

## Project Structure

```
cv-match/
│
├── frontend-react/        # React + Vite frontend
├── backend-spring/        # Spring Boot backend API
├── langchain-service/     # Python FastAPI AI microservice
```

---

## Features

### 1. CV Analysis (AI Service)

- Upload a CV (PDF) and a job description.
- The service semantically analyzes the CV against the job description using OpenAI (via LangChain).
- Returns:
  - Highlighted matches (skills/experience found)
  - Missing areas (requirements not found)
  - Personalized improvement suggestions
  - A match score (0-100)

### 2. Job Application Tracking (Backend)

- User authentication (JWT-based, with refresh tokens)
- CRUD for job applications:
  - Add, update, delete, and list applications
  - Filter and sort by status, date, etc.
- Status management (custom statuses for applications)
- Analytics endpoints:
  - Application counts by status
  - Monthly application trends
  - Sankey diagram data for application flow

### 3. Frontend

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

### AI Service (FastAPI)

- `POST /analyze` — Analyze a CV (PDF) against a job description

---

## Environment Variables

Each service uses its own `.env` file for configuration (API keys, DB credentials, etc.).

---

## License

[MIT](LICENSE)

---

## Acknowledgements

- [LangChain](https://github.com/langchain-ai/langchain)
- [OpenAI](https://openai.com/)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
