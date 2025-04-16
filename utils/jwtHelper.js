const jwt = require("jsonwebtoken");
/**
 * @class JwtHelper
 * @description Handles JWT token generation and verification   
 */

class JwtHelper {
    // Generate JWT token
    generateToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET_KEY);
    }
    
    // Verify JWT token
    verifyToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    }
}

module.exports =  JwtHelper