const { getController } = require('./controller');
const { validator } = require('./validator');

module.exports = { getController, getValidator: validator };
