import { Router } from 'express';

import Task from './task.model';
import * as tasksService from './task.service';

const router = Router({ mergeParams: true });

router
  .route('/')
  .get(async (req, res) => {
    const { boardId } = req.params;
    const tasks = await tasksService.getAll(boardId!);
    res.json(tasks);
  })
  .post(async (req, res) => {
    const { boardId } = req.params;
    const task = await tasksService.create(
      boardId!,
      new Task(boardId!, req.body)
    );
    res.status(201).json(task);
  });

router
  .route('/:taskId')
  .get(async (req, res) => {
    const { taskId, boardId } = req.params;
    const task = await tasksService.getById(boardId!, taskId!);
    if (!task) {
      res.status(404).json();
    } else {
      res.json(task);
    }
  })
  .put(async (req, res) => {
    const { taskId, boardId } = req.params;
    const task = await tasksService.update(boardId!, taskId!, req.body);
    res.json(task);
  })
  .delete(async (req, res) => {
    const { taskId, boardId } = req.params;
    await tasksService.remove(boardId!, taskId!);
    res.status(204).json();
  });

export default router;