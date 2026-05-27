# MERN Realtime Chat Application

A modern full-stack realtime chat platform built using the MERN stack with JWT authentication, Socket.IO realtime communication, MongoDB relationship modeling, protected routes, Cloudinary media uploads, and scalable conversation architecture.

---

# Features

## Authentication & Authorization

* JWT Access Token authentication
* Refresh Token support
* Protected routes
* Persistent login sessions
* Middleware-based backend verification
* Secure route protection architecture

---

# User System

## Features

* User registration and login
* Fetch authenticated user data
* Edit profile functionality
* Upload profile avatars
* Cloudinary image hosting integration
* Protected profile routes

---

# Dashboard

## Features

* Responsive realtime chat dashboard
* Mobile responsive layout
* Dynamic conversation sidebar
* User search functionality
* Realtime chat rendering
* Conversation selection system
* Responsive mobile chat navigation

---

# Conversation System

## Features

* Create conversations between users
* Prevent duplicate conversations
* Fetch all user conversations
* Dynamic conversation rendering
* MongoDB relationship modeling
* Mongoose populate functionality

---

# Message System

## Features

* Send text messages
* Store messages in MongoDB
* Fetch conversation messages
* Realtime message rendering
* Conditional message alignment
* Dynamic message updates
* Conversation-based message history

---

# Realtime Communication

## Socket.IO Features

* Persistent realtime connections
* Live message delivery
* Conversation-based socket rooms
* Event-driven architecture
* Instant UI synchronization
* Realtime frontend updates

---

# Responsive Design

## Features

* Mobile responsive UI
* Adaptive sidebar layout
* Mobile chat transitions
* Flexible chat interface
* Responsive messaging layout

---

# Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* CSS3
* Socket.IO Client

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO

---

# Authentication

* JSON Web Tokens (JWT)
* Access Tokens
* Refresh Tokens
* Middleware Authentication

---

# File Uploads

* Multer
* Cloudinary
* multer-storage-cloudinary

---

# Architecture

* REST API Architecture
* Realtime WebSocket Architecture
* MVC Pattern
* Middleware-based Authentication
* MongoDB Relationship Modeling
* Event-driven Communication
* REST + Socket.IO Hybrid System

---

# Project Structure

```bash
backend/
│
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── conversationController.js
│   └── messageController.js
│
├── middleware/
│   ├── multer.js
│   └── verifyAccessJwt.js
│
├── models/
│   ├── user.js
│   ├── conversation.js
│   └── message.js
│
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── conversationRoutes.js
│   └── messageRoutes.js
│
├── config/
│   └── cloudinary.js
│
└── server.js



frontend/
│
├── pages/
│   ├── Dashboard.jsx
│   ├── EditProfile.jsx
│   └── Login.jsx
│
├── services/
│   └── verifyJwtService.js
│
├── styles/
│   ├── dashboard.css
│   └── editprofile.css
│
└── App.jsx
```

---

# Database Models

## User Model

```js
{
   name: String,
   username: String,
   email: String,
   password: String,
   avatar: String,
   refreshToken: String
}
```

---

## Conversation Model

```js
{
   members: [
      ObjectId,
      ObjectId
   ]
}
```

---

## Message Model

```js
{
   conversationId: ObjectId,
   sender: ObjectId,
   text: String
}
```

---

# Authentication Flow

```text
User Login
    ↓
Backend verifies credentials
    ↓
Access Token generated
    ↓
Refresh Token generated
    ↓
Tokens stored on client
    ↓
Protected routes verified using JWT middleware
```

---

# Conversation Flow

```text
Search user
      ↓
Click searched user
      ↓
Conversation creation request sent
      ↓
Backend checks existing conversation
      ↓
If conversation exists → return existing
If not → create new conversation
      ↓
Conversation stored in MongoDB
      ↓
Populate members data
      ↓
Frontend renders conversation sidebar
```

---

# Message Flow

```text
User selects conversation
        ↓
Frontend fetches conversation messages
        ↓
Messages rendered dynamically
        ↓
User sends message
        ↓
REST API stores message in MongoDB
        ↓
Socket.IO emits realtime event
        ↓
Conversation room receives event
        ↓
Frontend updates instantly
```

---

# Socket.IO Architecture

```text
Frontend connects to Socket.IO server
        ↓
Backend creates persistent socket connection
        ↓
User joins conversation room
        ↓
Frontend emits send_message event
        ↓
Backend receives event
        ↓
Backend emits receive_message to room
        ↓
Connected users receive message instantly
```

---

# Profile Update Flow

```text
User selects avatar image
        ↓
React creates FormData
        ↓
Axios sends multipart/form-data
        ↓
Multer middleware processes image
        ↓
Cloudinary uploads image
        ↓
Cloudinary returns image URL
        ↓
MongoDB stores avatar URL
        ↓
Frontend renders updated image
```

---

# Current Implemented APIs

## Authentication Routes

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
```

---

## User Routes

```http
GET    /api/users/me
PUT    /api/users/updateprofile
GET    /api/users/search
```

---

## Conversation Routes

```http
POST   /api/conversations/create
GET    /api/conversations
```

---

## Message Routes

```http
POST   /api/messages
GET    /api/messages/:conversationId
```

---

# Environment Variables

Create a `.env` file inside backend folder:

```env
PORT=5000

MONGO_URL=your_mongodb_url

SUPER_SECRET_KEY=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

# Installation

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# Learning Highlights

This project demonstrates understanding of:

* Full-stack MERN development
* JWT authentication systems
* Refresh token architecture
* Protected frontend routing
* Protected backend routes
* REST API architecture
* Realtime communication systems
* WebSocket architecture
* Socket.IO event flow
* Conversation room management
* MongoDB relationship modeling
* Mongoose populate
* React state management
* Middleware architecture
* Event-driven backend systems
* Responsive frontend architecture
* Cloudinary media storage integration

---

# Upcoming Features

* Typing indicators
* Online/offline user status
* Message timestamps
* Image messages
* Seen message status
* Notifications
* Redis caching
* Docker deployment
* CI/CD pipeline
* HTTPS with NGINX
* AWS deployment

---

# Future Deployment Stack

| Service       | Technology     |
| ------------- | -------------- |
| Frontend      | Vercel         |
| Backend       | AWS EC2        |
| Database      | MongoDB Atlas  |
| Media Storage | Cloudinary     |
| Reverse Proxy | NGINX          |
| CI/CD         | GitHub Actions |

---

# Author

Built and engineered by **Anmol Mehra**
