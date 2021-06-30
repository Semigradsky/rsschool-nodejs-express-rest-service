import { Router } from 'express';
import { wrapRoute } from 'utils/wrapRoute';

import Board from './board.model';
import * as boardsService from './board.service';

const router = Router();

router
  .route('/')
  .get(wrapRoute(async (_req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
  }))
  .post(wrapRoute(async (req, res) => {
    const board = await boardsService.create(new Board(req.body));
    res.status(201).json(board);
  }));

router
  .route('/:boardId')
  .get(wrapRoute(async (req, res) => {
    const { boardId } = req.params;
    const board = await boardsService.getById(boardId!);
    if (!board) {
      res.status(404).json();
    } else {
      res.json(board);
    }
  }))
  .put(wrapRoute(async (req, res) => {
    const { boardId } = req.params;
    const board = await boardsService.update(boardId!, req.body);
    res.json(board);
  }))
  .delete(wrapRoute(async (req, res) => {
    const { boardId } = req.params;
    const removed = await boardsService.remove(boardId!);
    res.status(removed ? 204 : 404).json();
  }));

export default router;
