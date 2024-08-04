const v1Router = require('express').Router();
const health = require('./health');
const { createController, createValidator } = require('./todos/create');
const { getValidator } = require('./todos/get');
const { getController } = require('./todos/get');

v1Router.get('/', health);
v1Router.post('/todo', createValidator, createController);
v1Router.get('/todo', getValidator, getController);

module.exports = v1Router;
