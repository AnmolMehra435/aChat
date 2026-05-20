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

const updatedata = async (req, res) => {
    try{
        const email = req.body.email;
        const name = req.body.name;
        const username = req.body.username;
        let avatar;

        if(req.file){
            avatar = req.file.path;
        }

        await User.updateOne(
            { email: email },
            {
               $set: 
                { name: name,
                email: email,
                avatar: avatar,
                username: username}
            }
        )

        res.json({
            "message": "updated"
        })
    }catch(err){
        return res.status(403).json({
            "message": "error ocurred"
        })
    }
}


module.exports = { getUser, updatedata }