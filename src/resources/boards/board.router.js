const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
  })
  .post(async (req, res) => {
    const board = await boardsService.create(new Board(req.body));
    res.status(201).json(board);
  });

router
  .route('/:boardId')
  .get(async (req, res) => {
    const { boardId } = req.params;
    const board = await boardsService.getById(boardId);
    if (!board) {
      res.status(404).json();
    } else {
      res.json(board);
    }
  })
  .put(async (req, res) => {
    const { boardId } = req.params;
    const board = await boardsService.update(boardId, req.body);
    res.json(board);
  })
  .delete(async (req, res) => {
    const { boardId } = req.params;
    await boardsService.remove(boardId);
    res.status(204).json();
  });

module.exports = router;
