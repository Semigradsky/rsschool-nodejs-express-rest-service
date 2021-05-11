const uuid = require('uuid').v4;

class Board {
  constructor(
    boardId,
    {
      id = uuid(),
      title,
      order,
      description,
      columnId = null,
      userId = null,
    } = {}
  ) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.boardId = boardId;
    this.columnId = columnId;
    this.userId = userId;
  }
}

module.exports = Board;
