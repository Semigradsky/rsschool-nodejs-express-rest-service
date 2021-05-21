const repository = require('./task.memory.repository');

const getAll = (boardId) => repository.getAll(boardId);

const getById = (boardId, taskId) => repository.getById(boardId, taskId);

const create = (boardId, task) => repository.create(boardId, task.id, task);

const update = (boardId, taskId, data) =>
  repository.update(boardId, taskId, data);

const remove = (boardId, taskId) => repository.delete(boardId, taskId);

module.exports = { getAll, getById, create, update, remove };
