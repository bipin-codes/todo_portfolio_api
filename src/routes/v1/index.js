const v1Router = require('express').Router();

const health = require('./health');
const { createValidator } = require('./todos/ validator');
const create = require('./todos/create');

v1Router.get('/', health);
v1Router.post('/todo', createValidator, create);

module.exports = v1Router;
