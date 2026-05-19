const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJwt = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(404).json({
            "message": "no header found"
        })
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SUPER_SECRET_KEY, (err, decoded) => {
        if(err){
            return res.status(409).json({
                "message": "invalid token"
            })
        }

        req.user = decoded;
        next();
    })
}

module.exports = verifyJwt