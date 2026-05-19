const User = require('../models/users');
const jwt = require('jsonwebtoken')
require('dotenv').config()


const getUser = async (req,res) => {
    const authHeader = req.headers.authorization

    let email;

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SUPER_SECRET_KEY, (err, decoded) => {
        if(err){
            return
        }

        email = decoded.email;
    })

    const existingUser = await User.findOne({
        email: email
    })

    res.json({
        user: existingUser
    })
}

module.exports = { getUser }