const uuid = require('uuid').v4;

/**
 * An user
 * @typedef {Object} User
 * @property {string} id - User ID
 * @property {string} name - User name
 * @property {string} login - User login
 * @property {string} password - User password
 */

/**
 * An user without password
 * @typedef {Object} UserForResponse
 * @property {string} id - User ID
 * @property {string} name - User name
 * @property {string} login - User login
 */

/** @module user.model */

/**
 * Class representing an user
 */
class User {
  /**
   * Create an user
   * @param {User} param - User data
   */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Prepare user data to return in response
   * @param {User} user - User data
   * @returns {UserForResponse}
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
