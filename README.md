# 🗣️ Internal Feedback System

A full-stack, dockerized web application to facilitate structured feedback sharing between managers and employees. Built with **FastAPI**, **React**, **PostgreSQL**, and **Docker**, it enables an organization to streamline employee feedback, track improvement areas, and foster a culture of transparency and growth.

---

## 📌 Features

- 👥 **Role-based access** for Managers and Employees
- 📝 **Submit feedback** with specific strengths, behaviors, and areas to improve
- 📄 **View feedback history** in a detailed, readable format
- ✏️ **Edit feedback** using intuitive modal forms
- 📊 **Team-based feedback assignment** (employees linked to managers)
- 🔐 **JWT-based Authentication** (Login/Signup)
- 🔁 **Dockerized** backend and frontend for easy deployment
- 📦 Seed scripts to generate mock users, teams, and feedback data

---

## 🛠️ Tech Stack

### 🔹 Frontend
- **React** (Vite)
- **TypeScript**
- **TailwindCSS**
- **React Router**
- **Axios**
- **Shadcn/UI** (modals, UI components)

### 🔹 Backend
- **FastAPI** (Python 3.11+)
- **SQLModel** (built on SQLAlchemy + Pydantic)
- **PostgreSQL**
- **NeonDB**
- **Alembic** (for migrations)
- **JWT Auth** via `fastapi-jwt-auth`
- **CORS** setup for cross-origin frontend access

### 🔹 DevOps
- **Docker** & **Docker Compose**
- Optional: **Render** for deployment

---

## 🧠 Project Architecture

feedback-system/
│
├── backend/
│ 
│ ├── migrations/ # DB migrations
│ ├── models/ # SQLModel definitions (User, Team, Feedback)
│ ├── routes/ # API routes (auth, feedback, team)
│ ├── schemas/ # Structured Classes
│ ├── utils/ # Utility Functions
│ ├── main.py # FastAPI app
│ ├── Dockerfile
│ └── requirements.txt
│
├── frontend/
│ ├── src/
│ │ ├── components/ # Forms, Cards, Modals
│ │ ├── pages/ # Login, Dashboard, Feedback Form
│ │ ├── context/ # AuthContext
│ │ └── App.tsx
│ ├── public/
│ ├── Dockerfile
│ └── vite.config.ts
│
├── docker-compose.yml
└── README.md

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Yogeshlodhi/feedback-system.git
cd feedback-system
```

### 2. Setup environment variables
Create .env files in both backend/ and frontend/ directories:

    - backend/.env
    - frontend/.env

DATABASE_URL=postgresql+psycopg2://postgres:postgres@db:5432/feedback_db
JWT_SECRET_KEY=your_super_secret

frontend/.env
env

VITE_API_URL=http://localhost:8000

# 🐳 Run with Docker
### Step 1: Build and start the services

```bash
docker-compose up --build
```

### Step 2: Open the app
Frontend: http://localhost:5173
Backend: http://localhost:8000/docs

<!-- 🧪 Run Seed Data (optional)
Populate your database with mock data:

bash
Copy
Edit -->
<!-- 
# Inside backend container
docker exec -it feedback-backend bash
cd app/seed
python seed_all.py
This seeds:

Users (employees & managers)

Teams (random manager-employee links)

Feedbacks (randomized for each team)

🧰 Useful Scripts
Run Alembic migrations
bash
Copy
Edit
alembic revision --autogenerate -m "create tables"
alembic upgrade head
Format code (backend)
bash
Copy
Edit
black app/
🧑‍💻 Development Setup (Without Docker)
Backend
bash
Copy
Edit
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
Frontend
bash
Copy
Edit
cd frontend
npm install
npm run dev
🌐 Deployment Options
Frontend (React):

Vercel or Netlify (vite.config.ts must allow correct base path)

Backend (FastAPI):

Render, Railway, or Fly.io

PostgreSQL:

Supabase or Render PostgreSQL

Make sure to update CORS settings and .env accordingly

✅ To-Do (Optional Enhancements)
 Add notifications/toasts for feedback actions

 Email alerts for submitted feedback

 Feedback acknowledgment feature

 Analytics for managers

 User avatars

🙌 Acknowledgements
FastAPI team for the blazing-fast backend framework

SQLModel & Alembic for smooth ORM and migrations

React + Tailwind + Shadcn for rapid UI development

Docker for enabling reproducible environments

🧑‍💼 Author
Yogesh Kumar
GitHub · LinkedIn -->