const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyRefreshJwt = async (req, res) => {
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
                "message": "invalid credentials"
            })
        }

        const email = decoded.email;
        const newAccessToken = jwt.sign({ email }, process.env.SUPER_SECRET_KEY, { expiresIn: '5m'});

        res.json({
            'accessToken': newAccessToken
        })
    })
}

module.exports = { verifyRefreshJwt }