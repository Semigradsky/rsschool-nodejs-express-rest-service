const repository = require('./user.memory.repository');
const boardService = require('../boards/board.service');
const taskService = require('../tasks/task.service');

const getAll = () => repository.getAll();

const getById = (userId) => repository.getById(userId);

const create = (user) => repository.create(user.id, user);

const update = (userId, data) => repository.update(userId, data);

const remove = async (userId) => {
  await repository.delete(userId);

  const boards = await boardService.getAll();
  const tasks = (
    await Promise.all(boards.map((board) => taskService.getAll(board.id)))
  ).flat();

  const tasksForUpdate = tasks.filter((task) => task.userId === userId);

  await Promise.all(
    tasksForUpdate.map((task) =>
      taskService.update(task.boardId, task.id, { userId: null })
    )
  );
};

module.exports = { getAll, getById, create, update, remove };
