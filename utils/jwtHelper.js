const jwt = require("jsonwebtoken");

class JwtHelper {
    generateToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET_KEY);
    }
    verifyToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    }
}

module.exports =  JwtHelper