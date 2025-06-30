# 🗣️ Internal Feedback System

A full-stack, dockerized web application to facilitate structured feedback sharing between managers and employees. Built with **FastAPI**, **React**, **PostgreSQL**, and **Docker**, it enables an organization to streamline employee feedback, track improvement areas, and foster a culture of transparency and growth.

---

## The Website is Live :
- [The Feedback System](https://feedback-system-fe.onrender.com)

# Use the following credentials : 
 - Manager :
 ```bash
 email : yogeshlodhi1208@gmail.com
 password : yogesh123
 username : Yogesh Lodhi
 ```

 - Employee :
 ```bash
 email : yogeshkumar051202@gmail.com
 password : yogesh123
 username : Yogesh Kumar
 ```

 - Any Other User :
    - You can login to any other user you find in the application using :
    ```bash
    email : firstname.lastname@gmail.com (virat.kohli@gmail.com)
    password : firstname123 (virat123)
    ```


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
    │ ├── db/ # DB Initialization/Setup
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
    │ │ ├── components/ # Sidebar, Re-Usable Components, Modals
    │ │ ├── pages/ 
    │ │ | ├── auth/ # Login, Signup Page
    │ │ | ├── employee/ # Employee Routes
    │ │ | ├── manager/ # Manager Routes
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

#### a. Create .env files in both backend/ and frontend/ directories: 

    - backend/.env
    - frontend/.env

#### b. Create your own local postres db credentials and use them or Use a cloud based postgres db: 

```bash
DB_HOST=""
DB_PORT=""
DB_USER=""
DB_PASSWORD=""
DB_NAME=""
```
#### a. Use either localhost or your deployed backend URL: 
```bash
    VITE_API_URL=http://localhost:8000/api
    VITE_API_URL=https://deployed_backend/api
```

# 🐳 Run with Docker
### Step 1: Change the docker-compose.example.yml to docker-compose.yml
### Step 2: Update credentials according to your uses

### Step 3: Build and start the services

```bash
docker-compose up --build
```

<!-- ### Live URLs
- [Admin Panel](https://adminpanel-zvp2.onrender.com/login) 
- [Students Portal](https://studentspanel.onrender.com/login) -->

### Step 4: Open the app
- [Frontend](http://localhost:5173) 
- [Backend](http://localhost:8000/docs)

# 🧪 Run Seed Data (optional)
Populate your database with mock data:

## Inside backend container
```bash
docker exec -it feedback-backend bash
python seed_users.py
python seed_teams.py
python seed_feedback.py
```

## This seeds:

- Users (employees & managers)

- Teams (random manager-employee links)

- Feedbacks (randomized for each team)

# 🧰 Useful Scripts

- Run Alembic migrations
```bash
    alembic revision --autogenerate -m "create tables"
    alembic upgrade head
```

- Format code (backend)

    ###### 🧑‍💻 Development Setup (Without Docker)
    - Backend
    ```bash
        cd backend
        python -m venv venv
        source venv/bin/activate
        pip install -r requirements.txt
        uvicorn app.main:app --reload
    ```
    - Frontend
    ```bash
        cd frontend
        npm install
        npm run dev
    ```

    - 🌐 Deployment Options

        ###### Frontend (React):
        - Vercel or Netlify (vite.config.ts must allow correct base path)

        ###### Backend (FastAPI):
        - Render, Railway, or Fly.io

        ###### PostgreSQL:

        - Supabase / Render PostgreSQL / NeonDB
        - Make sure to update CORS settings and .env accordingly


## ✅ To-Do (Optional Enhancements)
 - Add notifications/toasts for feedback actions

 - Email alerts for submitted feedback

 - Analytics for managers



# 🧑‍💼 Author
## Yogesh Kumar

- [Github](https://github.com/Yogeshlodhi) 
- [LinkedIn](https://www.linkedin.com/in/yogesh-kumar-4346a1226/)
- [Portfolio](https://new-portfolio-flame-nine-65.vercel.app/) 