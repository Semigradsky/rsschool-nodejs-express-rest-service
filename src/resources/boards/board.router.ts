import { Router } from 'express';

import Board from './board.model';
import * as boardsService from './board.service';

const router = Router();

router
  .route('/')
  .get(async (_req, res) => {
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
    const board = await boardsService.getById(boardId!);
    if (!board) {
      res.status(404).json();
    } else {
      res.json(board);
    }
  })
  .put(async (req, res) => {
    const { boardId } = req.params;
    const board = await boardsService.update(boardId!, req.body);
    res.json(board);
  })
  .delete(async (req, res) => {
    const { boardId } = req.params;
    await boardsService.remove(boardId!);
    res.status(204).json();
  });

export default router;
