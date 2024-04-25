const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY);
};


const verifyToken = (token) => {
    return jwt.verify(token,secretKey)
}

module.exports = { generateToken, verifyToken };
