const health = require('./health');

const v2Router = require('express').Router();

v2Router.get('/', health);

module.exports = v2Router;
