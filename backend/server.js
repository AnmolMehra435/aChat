const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');
const verifyAccessJwt = require('./middleware/verifyAccessJwt');
require('dotenv').config()

const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);

        app.listen(port, () => {
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
