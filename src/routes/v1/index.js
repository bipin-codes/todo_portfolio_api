const health = require('./health');

const v1Router = require('express').Router();

v1Router.get('/', health);

module.exports = v1Router;
