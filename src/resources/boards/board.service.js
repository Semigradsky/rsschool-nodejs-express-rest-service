const repository = require('./board.memory.repository');
const taskService = require('../tasks/task.service');

const getAll = () => repository.getAll();

const getById = (boardId) => repository.getById(boardId);

const create = (board) => repository.create(board.id, board);

const update = (boardId, data) => repository.update(boardId, data);

const remove = async (boardId) => {
  const tasks = await taskService.getAll(boardId);
  await Promise.all(tasks.map((task) => taskService.remove(boardId, task.id)));

  await repository.delete(boardId);
};

module.exports = { getAll, getById, create, update, remove };
