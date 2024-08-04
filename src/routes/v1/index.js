const v1Router = require('express').Router();
const health = require('./health');

const { createController, createValidator } = require('./todos/create');
const { deleteController, deleteValidator } = require('./todos/delete');
const { getController, getValidator } = require('./todos/get');

v1Router.get('/', health);

v1Router.post('/todo', createValidator, createController);

v1Router.get('/todo', getValidator, getController);

v1Router.delete('/todo', deleteValidator, deleteController);

module.exports = v1Router;
