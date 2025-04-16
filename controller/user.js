const DatabaseHandler = require("../dbHandler/databseHandler");
const JwtHelper = require("../utils/jwtHelper");
const messages = require("../utils/messages");
const ResponseHandler = require("../utils/responseHandler");

/**
 @class UserController
 * @description 
  -  Handles user-related operations including:
 * - Creating a new user
 * - Fetching the logged-in user
 * - Getting user by ID
 * - Listing all users
 * - Deleting a user
 *
 @constructor
 * - DatabaseHandler: Handles database interactions
 * - ResponseHandler: Formats and sends HTTP responses
 * - JwtHelper: Generates JWT tokens
 */

class UserController {
  constructor() {
    this.dbHandler = new DatabaseHandler();
    this.responseHandler = new ResponseHandler();
    this.jwtHelper = new JwtHelper();
  }

  // Create a new user
  async createUser(req, res) {
    try {
      const { name, email, password, dob } = req.body;
      const isUserExists = await this.dbHandler.getUser({
        email: email,
        isDeleted: false,
      });

      if (isUserExists) {
        return this.responseHandler.send(res, {
          status: this.responseHandler.getCode().codes.BAD_REQUEST,
          message: messages.USER_ALREADY_EXIST,
        });
      }

      const data = {
        name,
        email,
        password,
        dob,
      };
      const user = await this.dbHandler.saveUser(data);
      const token = this.jwtHelper.generateToken({
        _id: user._id,
        email: user.email,
      });

      return this.responseHandler.send(res, {
        status: this.responseHandler.getCode().codes.OK,
        message: messages.USER_REGISTERED,
        payloadKey: "token",
        data: token,
      });

    } catch (error) {
      console.log("Error in creating user", error);
      return this.responseHandler.send(res, {
        status: this.responseHandler.getCode().codes.INTERNAL_SERVER_ERROR,
        message: messages.SERVER_ERROR_MESSAGE,
      });
    }
  }
 
  //get user based on token
  async getUser(req, res) {
    try {
      const { _id } = req.user;
      const user = await this.dbHandler.getUser({ _id: _id  , isDeleted: false});

      if (!user) {
        return this.responseHandler.send(res, {
          status: this.responseHandler.getCode().codes.NOT_FOUND,
          message: messages.USER_NOT_FOUND,
        });
      }

      return this.responseHandler.send(res, {
        status: this.responseHandler.getCode().codes.OK,
        message: messages.USER_FOUND,
        payloadKey: "user",
        data: user,
      });
    } catch (error) {
      console.log("Error in getting user from Token", error);
      return this.responseHandler.send(res, {
        status: this.responseHandler.getCode().codes.INTERNAL_SERVER_ERROR,
        message: messages.SERVER_ERROR_MESSAGE,
      });
    }
  }

  //get user by id
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await this.dbHandler.getUser({ _id: id , isDeleted: false });

      if (!user) {
        return this.responseHandler.send(res, {
          status: this.responseHandler.getCode().codes.NOT_FOUND,
          message: messages.USER_NOT_FOUND,
        });
      }

      return this.responseHandler.send(res, {
        status: this.responseHandler.getCode().codes.OK,
        message: messages.SUCCESS,
        payloadKey: "user",
        data: user,
      });
    } catch (error) {
      console.log("Error in getting user", error);
      return this.responseHandler.send(res, {
        status: this.responseHandler.getCode().codes.INTERNAL_SERVER_ERROR,
        message: messages.SERVER_ERROR_MESSAGE,
      });
    }
  }

  //get all users
  async getAllUsers(req, res) {
    try {
      const users = await this.dbHandler.getAllUsers();
      if (users.length === 0) {
        return this.responseHandler.send(res, {
          status: this.responseHandler.getCode().codes.NOT_FOUND,
          messages: messages.USER_NOT_FOUND,
        });
      }

      return this.responseHandler.send(res, {
        status: this.responseHandler.getCode().codes.OK,
        message: messages.SUCCESS,
        payloadKey: "users",
        data: users,
      });
    } catch (error) {
      console.log("Error in getting all users", error);
      return this.responseHandler.send(res, {
        status: this.responseHandler.getCode().codes.INTERNAL_SERVER_ERROR,
        message: messages.SERVER_ERROR_MESSAGE,
      });
    }
  }

  //delete user by id
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await this.dbHandler.getUser({ _id: id , isDeleted: false });

      if (!user) {
        return this.responseHandler.send(res, {
          status: this.responseHandler.getCode().codes.NOT_FOUND,
          message: messages.USER_ALREADY_DELETED, 
        });
      }

      const deletedUser = await this.dbHandler.deleteUser(id);
      if (!deletedUser) {
        return this.responseHandler.send(res, {
          status: this.responseHandler.getCode().codes.INTERNAL_SERVER_ERROR,
          message: messages.USER,
        });
      }

      return this.responseHandler.send(res, {
        status: this.responseHandler.getCode().codes.OK,
        message: messages.USER_DELETED,
      });
    } catch (error) {
      console.log("Error in deleting user", error);
      return this.responseHandler.send(res, {
        status: this.responseHandler.getCode().codes.INTERNAL_SERVER_ERROR,
        message: messages.SERVER_ERROR_MESSAGE,
      });
    }
  }
}

module.exports = UserController;
