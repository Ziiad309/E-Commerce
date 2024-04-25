const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {

    console.log('header: ',req.headers)

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.sendStatus(401); // Unauthorized if no Authorization header
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized if no token found
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if token is invalid
        }
        
        req.user = user; // Attach user information to the request
        next();
    });
};

module.exports = authenticateToken;
