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
git clone https://github.com/okukucephasna/notes-app.git
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
![docker interface](https://github.com/user-attachments/assets/57585598-9f58-47de-93d8-43600aa91b54)
🐳 Docker Desktop: Running Containers
Screenshot 1: Docker Desktop Interface
This screenshot shows the running containers for the Focus Notes App in Docker Desktop. You can see three services:
✅ notes-backend – Flask API server
✅ notes-frontend – React app served via Nginx
✅ notes-db – MySQL database storing user credentials and notes
You can click on any of these services in Docker Desktop to view their logs, restart them, or confirm they are healthy and running. This makes monitoring your app during development or deployment much easier.

* **Login Page**
  ![signin](https://github.com/user-attachments/assets/ff472462-16b6-43a1-88e5-7434740263b9)
  🔐 User Sign In Page
Screenshot 2: Sign In Interface
This is the Sign In page of the Focus Notes App. Users are required to enter their email and password to access their personal dashboard. The system securely validates the credentials via the Flask backend, which checks the information against records stored in the MySQL database.
✅ On successful login, users are redirected to the Dashboard.
❌ If credentials are incorrect, an error alert is displayed.
🔄 There is also a link to navigate to the Sign Up page for new users.
This page is the entry point to the app’s core features and ensures only authorized access to user data.

* **Signup Page**
  ![signup](https://github.com/user-attachments/assets/fe396007-b492-4c78-9c47-28f061041f3c)
  📝 User Sign Up Page
Screenshot 3: New User Registration
This is the Sign Up page where new users can create an account by providing their email address and password. Upon clicking the "Sign Up" button:
The form data is sent to the Flask backend via a POST request.
The backend checks whether the email already exists.
If the registration is successful, the user is redirected to the Sign In page with a success alert.
All passwords are securely hashed before being stored in the MySQL database.
This form is simple and beginner-friendly, designed to onboard users quickly and securely into the Focus Notes system.

* **Notes Dashboard**
  ![dashborad](https://github.com/user-attachments/assets/bf0a8ff9-43c4-47af-b5bd-376ebca1c551)
  📓 Notes Dashboard
Screenshot 4: User Dashboard after Login
After a successful login, the user is directed to the Dashboard, which is the central place for managing notes. Here's what this screen offers:
✅ A personalized view showing all notes created by the logged-in user.
➕ A “+ Add Note” button at the top-right to create new notes.
✏️ Each note has Edit and Delete buttons for easy management.
🔐 A Logout button is also provided to securely end the session.
The Dashboard pulls note data from the Flask backend using axios and renders it responsively using Bootstrap cards. The user’s session is managed via localStorage.

* **Add Notes**
  ![add notes modal](https://github.com/user-attachments/assets/3654454d-36e1-4902-81d2-75c7b22595ef)
➕ Add a New Note
Screenshot 5: Add Note Modal
When the user clicks the “+ Add Note” button on the Dashboard, a Bootstrap modal is triggered. This modal allows users to create a new note by entering:
📝 Title – A brief heading or summary for the note.
📄 Body – The main content of the note.
After filling in the fields and clicking Add, the note is saved via a POST request to the Flask backend and immediately displayed on the Dashboard. Input validation ensures that both fields are required.
The modal is dismissed automatically after a successful submission.

* **Edit Notes**
  ![Edit notes modal](https://github.com/user-attachments/assets/fd05a9f9-9a8f-4364-bec6-c62d993bb664)
  ✏️ Edit an Existing Note
Screenshot 6: Edit Note Modal
Each note displayed on the Dashboard has an Edit button. When clicked, it opens the same modal used for creating notes, but this time pre-filled with the selected note’s existing title and body.
Users can update the content and then click Update to save changes.
A PUT request is sent to the Flask backend to update the note in the database.
The modal closes automatically, and the updated note appears on the Dashboard.
This reuse of the modal streamlines the interface and provides a consistent user experience.

 **Delete Notes**
  ![modal when you try to delete](https://github.com/user-attachments/assets/205ef020-c8a1-4031-8235-b0e5ecb14337)
  🗑️ Delete a Note
Screenshot 7: Delete Confirmation Modal
When the Delete button is clicked on a note card, a small confirmation modal appears at the center of the screen. This modal is designed to:
Ask the user if they’re sure about deleting the note.
Prevent accidental deletions with a clear warning and Cancel option.
On confirmation, a DELETE request is sent to the Flask backend.
The note is removed from the database and immediately disappears from the Dashboard.
This feature adds a safety layer to the note management system while maintaining responsiveness and ease of use.



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
