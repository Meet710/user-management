const USER = require("../model/user");


/**
 * @class DatabaseHandler
 * @description
 * - Handles database interactions for user-related operations.
 * - Provides methods for saving a new user, getting a user by ID, listing all users, updating a user, and deleting a user.
 * @constructor
 * - model - The Mongoose model for user data operations.
 */

class DatabaseHandler {
  constructor() {
    this.model = USER;
  }

 //save user
  async saveUser(user) {
    try {
      const result = await this.model.create(user);
      return result;
    } catch (error) {
      console.log("Error in saving user", error);
      throw new Error(error);
    }
  }

  //get user by based on data
  async getUser(data) {
    try {
      const result = await this.model.findOne(data).select({ _id :1 , name:1, email:1, DOB:1 });
      return result;
    } catch (error) {
      console.log("Error in getting user", error);
      throw new Error(error);
    }
  }

//get all users
  async getAllUsers() {
    try {
      const result = await this.model.find({ isDeleted: false }).select({ _id :1 , name:1, email:1, dob:1 });
      return result;
    } catch (error) {
      console.log("Error in getting all users", error);
      throw new Error(error);
    }
  }

  //update user
  async updateUser(id, updateData) {
    try {
      const result = await this.model.updateOne({ _id: id }, updateData);
      return result;
    } catch (error) {
      console.log("Error in updating user", error);
      throw new Error(error.message || "Error updating user");
    }
  }

  //delete user
  async deleteUser(id) {
    try {
      const result = await this.model.updateOne(
        { _id: id },
        { isDeleted: true }
      );
      return result;
    } catch (error) {
      console.log("Error in deleting user", error);
      throw new Error(error.message || "Error deleting user");
    }
  }
}

module.exports = DatabaseHandler;
