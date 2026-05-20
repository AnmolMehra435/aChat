# MERN Realtime Chat Application

A modern full-stack realtime chat application built using the MERN stack with JWT authentication, Cloudinary media uploads, MongoDB relationship modeling, protected routes, and scalable conversation architecture.

---

#  Features

##  Authentication & Authorization

- JWT Access Token authentication
- Refresh Token support
- Protected routes
- Persistent login sessions
- Secure backend verification middleware

---

##  User System

- User registration and login
- Fetch authenticated user data
- Edit profile functionality
- Upload profile avatars
- Cloudinary image hosting integration

---

##  Dashboard

- Responsive chat dashboard UI
- User sidebar
- Conversation sidebar
- Search users functionality
- Dynamic conversation rendering

---

##  Conversation System

- Create conversations between users
- Prevent duplicate conversations
- Fetch all user conversations
- MongoDB relationship modeling using references
- Mongoose populate functionality

---

##  Responsive Design

- Mobile responsive layout
- Sidebar adaptation
- Flexible chat UI

---

#  Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- CSS3

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Authentication

- JSON Web Tokens (JWT)
- Access Tokens
- Refresh Tokens

---

## File Uploads

- Multer
- Cloudinary
- multer-storage-cloudinary

---

## Architecture

- REST API Architecture
- MVC Pattern
- Middleware-based Authentication
- MongoDB Relationship Modeling

---

#  Project Structure

```bash
backend/
│
├── config/
│   └── cloudinary.js
│
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   └── conversationController.js
│
├── middleware/
│   ├── multer.js
│   └── verifyAccessJwt.js
│
├── models/
│   ├── user.js
│   └── conversation.js
│
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── conversationRoutes.js
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

#  Database Models

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

#  Authentication Flow

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

#  Profile Update Flow

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
Frontend renders image
```

---

#  Conversation Flow

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
Frontend renders conversations sidebar
```

---

# 🌐 Current Implemented APIs

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

# ⚙️ Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000

MONGO_URL=your_mongodb_url

ACCESS_SECRET_KEY=your_access_secret
REFRESH_SECRET_KEY=your_refresh_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

#  Installation

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

#  Upcoming Features

- Realtime messaging with Socket.IO
- Message schema implementation
- Live message delivery
- Online/offline user status
- Typing indicators
- Image messages
- Notifications
- Last message previews
- Message timestamps
- Docker deployment
- CI/CD pipeline
- HTTPS with NGINX
- AWS deployment

---

#  Learning Highlights

This project demonstrates understanding of:

- Full-stack MERN development
- JWT authentication systems
- REST API architecture
- MongoDB relationships
- Mongoose populate
- Cloud storage integration
- React state management
- Protected frontend routing
- Middleware architecture
- Responsive frontend design

---

# Future Deployment Stack

| Service | Technology |
|---|---|
| Frontend | Vercel |
| Backend | AWS EC2 |
| Database | MongoDB Atlas |
| Media Storage | Cloudinary |
| Reverse Proxy | NGINX |
| CI/CD | GitHub Actions |

---

# Author

Built and engineered by **Anmol Mehra**.