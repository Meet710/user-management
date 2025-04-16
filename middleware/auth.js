const JwtHelper = require("../utils/jwtHelper");
const messages = require("../utils/messages");
const ResponseHandler = require("../utils/responseHandler");

/**
 * @class UserAuth
 * @description Handles user authentication
 * @constructor
 * - JwtHelper: Handles JWT token generation and verification
 * - ResponseHandler: Formats and sends HTTP responses
 */

class UserAuth {
    constructor() {
        this.jwtHelper = new JwtHelper();
        this.responseHandler = new ResponseHandler();
    }

    // Middleware to verify user authentication
    verifyToken = (req, res, next) => {
        const token = req.headers['authorization'];

        if (!token) {
            return this.responseHandler.send(res, {
                status: this.responseHandler.getCode().codes.UNAUTHORIZED,
                message: messages.ACCESS_TOKEN_REQUIRED
            });
        }

        const authToken = token.split(" ")[1];

        const decodedToken = this.jwtHelper.verifyToken(authToken);

        if (!decodedToken) {
            return this.responseHandler.send(res, {
                status: this.responseHandler.getCode().codes.UNAUTHORIZED,
                message: messages.INVALID_TOKEN
            });
        }

        req.user = decodedToken;
        return next();
    }
}

module.exports = new UserAuth();
