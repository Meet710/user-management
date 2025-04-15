const USER = require("../model/user");


/**
 * DatabaseHandler class for performing CRUD operations on the User model.
 */

class DatabaseHandler {
  constructor() {
    this.model = USER;
  }

  /**
   * Saves a new user to the database.
   * @param {Object} user - The user data to be saved.
   * @returns {Promise<Object>} - The saved user document.
   * @throws {Error} - If there's an error while saving the user.
   */
  async saveUser(user) {
    try {
      const result = await this.model.create(user);
      return result;
    } catch (error) {
      console.log("Error in saving user", error);
      throw new Error(error);
    }
  }

  /**
   * Retrieves a user by email.
   * @param {string} email - The email of the user to retrieve.
   * @returns {Promise<Object|null>} - The user document or null if not found.
   * @throws {Error} - If there's an error while retrieving the user.
   */
  async getUser(data) {
    try {
      const result = await this.model.findOne(data).select({ _id :1 , name:1, email:1, DOB:1 });
      return result;
    } catch (error) {
      console.log("Error in getting user", error);
      throw new Error(error);
    }
  }

  /**
   * Retrieves all users from the database.
   * @returns {Promise<Array>} - List of all user documents.
   * @throws {Error} - If there's an error while retrieving users.
   */
    
  async getAllUsers() {
    try {
      const result = await this.model.find().select({ _id :1 , name:1, email:1, DOB:1 });
      return result;
    } catch (error) {
      console.log("Error in getting all users", error);
      throw new Error(error);
    }
  }
  /**
   * Updates a user's data based on their ID.
   * @param {string} id - The ID of the user to update.
   * @param {Object} updateData - The data to update in the user document.
   * @returns {Promise<Object>} - MongoDB update result.
   * @throws {Error} - If there's an error while updating the user.
   */
  async updateUser(id, updateData) {
    try {
      const result = await this.model.updateOne({ _id: id }, updateData);
      return result;
    } catch (error) {
      console.log("Error in updating user", error);
      throw new Error(error.message || "Error updating user");
    }
  }

  /**
   * Soft deletes a user by setting `isDeleted` to true.
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise<Object>} - MongoDB update result indicating the soft deletion.
   * @throws {Error} - If there's an error while deleting the user.
   */
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
