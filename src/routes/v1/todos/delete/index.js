const { deleteController } = require('./controller');
const { validator } = require('./validator');

module.exports = { deleteController, deleteValidator: validator };
