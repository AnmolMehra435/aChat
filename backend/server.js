const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const mongoose = require('mongoose')
const cors = require('cors');
const verifyAccessJwt = require('./middleware/verifyAccessJwt');
require('dotenv').config()

const { Server } = require('socket.io');

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
})

io.on('connection', (socket) => {
    console.log("user connected");  
    socket.on('send_message', (message) => {
        io.to(message.conversationId).emit(
        'receive_message',
        message
    );

    });

    socket.on(
        'join_conversation',
        (conversationId) => {

            socket.join(conversationId);

            console.log(
                `Joined room ${conversationId}`
            );

        }
    );
})

const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);

        server.listen(port, () => {
            console.log(`Server is running on port: ${port}`)
        })
        
        console.log("MongoDB connected.....");
    }catch(err){
        console.log(err.message);
    }
}

app.use('/api/auth', require('./routes/authRoutes'))

app.use('/api/users', require('./routes/userRoutes'))

app.use('/api/conversations', require('./routes/conversationRoutes'))

app.use('/api/messages', require('./routes/messagesRoutes'))

app.get('/api/dashboard', verifyAccessJwt, (req, res) => {
    res.json({
        "verified": true
    })
})

app.get('/', (req, res) => {
    res.json({
        "message": "server is running"
    })
})

connectDB();
