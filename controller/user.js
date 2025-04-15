const DatabaseHandler = require("../dbHandler/databseHandler");
const JwtHelper = require("../utils/jwtHelper");
const messages = require("../utils/messages");
const ResponseHandler = require("../utils/responseHandler");

class UserController {
  constructor() {
    this.dbHandler = new DatabaseHandler();
    this.responseHandler = new ResponseHandler();
    this.jwtHelper = new JwtHelper();
  }

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
        message: messages.SUCCESS,
        payloadKey: "token",
        data: token,
      });

    } catch (error) {
      console.log("Error in creating user", error);
      return this.responseHandler.send(res, {
        status: this.responseHandler.getCode().codes.INTERNAL_SERVER_ERROR,
        message: messages.SERVER_ERROR_MESSAGE,
        data: false,
      });
    }
  }

  async getUser(req, res) {
    try {
      const { _id } = req.user;
      const user = await this.dbHandler.getUser({ _id: _id });

      if (!user) { 
        return this.responseHandler.send(res, {
          status: this.responseHandler.getCode().codes.NOT_FOUND,
          message: messages.USER_NOT_FOUND,
        })
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
      })
    }
  }
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await this.dbHandler.getUser({ _id: id });

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

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await this.dbHandler.getUser({ _id: id });
      if (!user) {
        return this.responseHandler.send(res, {
          status: this.responseHandler.getCode().codes.NOT_FOUND,
          message: messages.USER_NOT_FOUND,
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
