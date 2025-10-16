
# MERN Task Manager API

A simple **REST API** built using **React.js**, **Node.js**, **Express**, and **MongoDB** to manage tasks with **JWT-based authentication**.

**🔗 Live:** [mern-taskmanger-api](https://mern-taskmanager-api.netlify.app/)

---

## 🚀 Features
- User registration & login  
- JWT authentication  
- Each user can manage only their own tasks  
- Error handling & validation  

---

## 🧠 Tech Stack
- React.js
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JSON Web Tokens (JWT)  
- bcrypt for password hashing  

---

## ⚙️ Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/VenkyRock143/mern-task-manager-api.git
   cd mern-task-manager-api
   ```
   
2. **Install dependencies frontend**
```bash]
cd frontend
npm install
```
3. **Install dependencies backend**
```bash
cd backend
npm install
```
4. **Start Application backend**
```bash
node server.js
```
5. **Start Application frontend**
```bash
npm start
```

6. **Enviroment Variables**
 ```bash
PORT=4000
MONGO_URI=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
ACCESS_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=7d
```
