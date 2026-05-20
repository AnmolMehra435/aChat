const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if(!name || !email || !password){
        return res.status(404).json({
            "message": "missing credentials"
        })
    }

    const duplicate = await User.findOne({
        email: email
    })
    
    if(duplicate){
        return res.status(409).json({
            "message": "user already exists"
        })
    }
    const username = email.split('@')[0];

    try{
        const hashPwd = await bcrypt.hash(password, 10) 

        const user = await User.create({
            name: name,
            email: email,
            username: username,
            password: hashPwd
        })

        res.status(201).json({
            "message": "user successfully registered"
        });
    }catch(err){
        console.log(err)
        res.status(500).json({
            "message": "internal server error"
        })
    }
}

const loginUser = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    if(!email || !password){
        return res.status(404).json({
            "message": "missing fields"
        })
    }

    const existingUser = await User.findOne({
        email: email
    })

    if(!existingUser){
        return res.status(404).json({
            "message": "user does not exists"
        })
    }

    const match = await bcrypt.compare(password, existingUser.password);

    if(match){
        const accessToken = jwt.sign({ email: existingUser.email }, process.env.SUPER_SECRET_KEY, { expiresIn: '5m'});
        const refreshToken = jwt.sign({ email: existingUser.email }, process.env.SUPER_SECRET_KEY, { expiresIn: '7d'})

        return res.json({
            'accessToken': accessToken,
            'refreshToken': refreshToken,
            'name': existingUser.name
        })
    }

    return res.status(422).json({
        "message": "invalid credentials"
    })

}

module.exports = { registerUser, loginUser }