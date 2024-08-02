const v1Router = require('express').Router();

const health = require('./health');
const create = require('./todos/create');

v1Router.get('/', health);
v1Router.post('/todo', create);

module.exports = v1Router;
