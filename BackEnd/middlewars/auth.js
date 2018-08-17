const jwt = require('jsonwebtoken');
require('dotenv/config');
module.exports =(req,res,next) =>{
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('access denied no token');
    try {

        decode = jwt.verify(token, process.env.JWT_KEY)
        req.user = decode ;
        next();
    } catch (error) {
        res.status(400).send('invalid token');
    }
}