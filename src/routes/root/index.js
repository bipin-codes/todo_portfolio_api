const { getController } = require('./controller');

const router = require('express').Router();

router.get('/', getController);

module.exports = router;
