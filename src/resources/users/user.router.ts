import { Router } from 'express';
import { wrapRoute } from 'utils/wrapRoute';

import User from './user.model';
import * as usersService from './user.service';

const router = Router();

router
  .route('/')
  .get(wrapRoute(async (_req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  }))
  .post(wrapRoute(async (req, res) => {
    const user = await usersService.create(new User(req.body));
    res.status(201).json(User.toResponse(user));
  }));

router
  .route('/:userId')
  .get(wrapRoute(async (req, res) => {
    const { userId } = req.params;
    const user = await usersService.getById(userId!);
    if (!user) {
      res.status(404).json();
    } else {
      res.json(User.toResponse(user));
    }
  }))
  .put(wrapRoute(async (req, res) => {
    const { userId } = req.params;
    const user = await usersService.update(userId!, req.body);
    res.json(User.toResponse(user));
  }))
  .delete(wrapRoute(async (req, res) => {
    const { userId } = req.params;
    await usersService.remove(userId!);
    res.status(204).json();
  }));

export default router;
