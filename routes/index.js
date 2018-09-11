const express = require('express');
const route = express.Router();
const { User } = require('../db/user').models;

route.get('/user/:id', (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
  .then(user => res.json(user))
  .catch(error => next(error));
});

route.get('/users', (req, res, next) => {
  User.findAll()
  .then(users => res.send(users))
  .catch(error => next(error));
});

route.get('/managers', (req, res, next) => {
  User.getManagers()
    .then(managers => res.send(managers))
    .catch(error => next(error));
});

route.put('/user/:id', (req, res, next) => {
  const change = req.body;
  User.findById(req.params.id)
  .then((user) => user.update(change))
  .then((updated) => res.send(updated))
  .catch((error) => next(error))
})

route.post('/users', (req, res, next) => {
  const data = req.body;
  User.create(data).then(data => res.send(data));
});

route.delete('/user/:id', async (req, res, next) => {
  const user = await User.findById(req.params.id)
  await user.destroy()
  res.sendStatus(204);
})

module.exports = route;
