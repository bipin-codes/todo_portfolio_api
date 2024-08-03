const v1Router = require('express').Router();
const health = require('./health');
const { createController, createValidator } = require('./todos/create');
const { getTodos } = require('./todos/get');

v1Router.get('/', health);
v1Router.post('/todo', createValidator, createController);
v1Router.get('/todo', getTodos);

module.exports = v1Router;
