const uuid = require('uuid').v4;

/**
 * An board
 * @typedef {Object} Board
 * @property {string} id - Board ID
 * @property {string} title - Board title
 * @property {Column[]} columns - Board columns
 */

/**
 * An board column
 * @typedef {Object} Column
 * @property {string} title - Board column title
 * @property {number} order - Board column order
 */

/** @module board.model */

/**
 * Class representing an board
 */
class Board {
  /**
   * Create an user
   * @param {Board} param - Board data
   */
  constructor({ id = uuid(), title, columns } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
