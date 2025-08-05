# 📝 Focus Notes App

Focus Notes is a simple full-stack web application built with **React** (frontend) and **Flask** (backend), containerized using **Docker**. It allows users to **sign up**, **log in**, and **create, edit, or delete personal notes**. Everything is securely stored in a **MySQL database**, and the app is designed to be lightweight and easy to deploy.

---

## 🌟 Features

- 🔐 User Authentication (Signup & Login)
- 🗂️ Create, Read, Update, and Delete Notes
- 🎨 Clean and responsive UI using **Bootstrap**
- 🐳 Dockerized for easy setup and deployment
- 🧠 MySQL database integration for persistent storage

---

## 🚀 Quick Start (Docker)

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd notes-app-frontend(react)-backend(flask)
````

### 2. Build and run everything with Docker Compose

```bash
docker-compose up --build
```

* The **frontend** will be available at: `http://localhost:3000`
* The **backend API** runs on: `http://localhost:5000`
* The **MySQL database** runs internally in the container.

---

## 🖼️ Screenshots

> Add your screenshots here (e.g., login screen, dashboard, note modal)

* **Login Page**
  ![Login Screenshot](screenshots/login.png)

* **Signup Page**
  ![Signup Screenshot](screenshots/signup.png)

* **Notes Dashboard**
  ![Dashboard Screenshot](screenshots/dashboard.png)

---

## 🏗️ Project Structure

```plaintext
.
├── backend/                 # Flask API backend
│   ├── app.py              # Main Flask app
│   ├── signin.py           # Sign-in logic
│   ├── signup.py           # Sign-up logic
│   ├── notes.py            # CRUD endpoints for notes
│   ├── db.py               # DB connection logic
│   └── initdb.py           # Creates tables (users, notes)
│
├── frontend/               # React frontend
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Signup.jsx
│   │   │   ├── Signin.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.js
│   │   └── index.js
│
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

## 📦 Docker Overview

### ✅ `docker-compose.yml`

Defines 3 services:

* `frontend` – Builds and serves the React app via Nginx.
* `backend` – Runs the Flask API.
* `db` – MySQL 8 container storing users and notes.

### ✅ `frontend/Dockerfile`

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### ✅ `backend/Dockerfile`

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

---

## 🧠 How It Works

### 🔙 Backend (Flask + MySQL)

* **`app.py`** — Registers API routes and handles CORS.
* **`signin.py` / `signup.py`** — Handle user login and registration with hashed passwords.
* **`notes.py`** — Handles all note CRUD actions (GET, POST, PUT, DELETE).
* **`initdb.py`** — Automatically creates `users` and `notes` tables if they don't exist.
* **`db.py`** — Establishes connection to the MySQL container using environment variables.

### 🎨 Frontend (React + Bootstrap)

* **`Signup.jsx`** — Page to register a new account.
* **`Signin.jsx`** — Page to log into your account.
* **`Dashboard.jsx`** — Main app page for managing notes. Notes are shown as cards. Each note can be edited or deleted via modals.

---

## 🔐 Authentication

* User info is stored in `localStorage` after login.
* Dashboard is protected: if not logged in, user is redirected to login page.

---

## ⚙️ Environment Variables

These are defined in `docker-compose.yml`:

```yaml
environment:
  - DB_HOST=db
  - DB_USER=root
  - DB_PASSWORD=pass123
  - DB_NAME=focus_notes
```

---

## 📌 To Do (optional)

* Add user registration validation
* Implement JWT-based auth (current method is simple `localStorage`)
* Add search/filter functionality for notes

---

## 🧑‍💻 Author

**Cephas Okuku**
Built with ❤️ using Flask, React, MySQL, and Docker

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).



Let me know!
```
