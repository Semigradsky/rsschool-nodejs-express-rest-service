const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const user = await usersService.create(new User(req.body));
    res.status(201).json(User.toResponse(user));
  });

router
  .route('/:userId')
  .get(async (req, res) => {
    const { userId } = req.params;
    const user = await usersService.getById(userId);
    if (!user) {
      res.status(404).json();
    } else {
      res.json(User.toResponse(user));
    }
  })
  .put(async (req, res) => {
    const { userId } = req.params;
    const user = await usersService.update(userId, req.body);
    res.json(User.toResponse(user));
  })
  .delete(async (req, res) => {
    const { userId } = req.params;
    await usersService.remove(userId);
    res.status(204).json();
  });

module.exports = router;
