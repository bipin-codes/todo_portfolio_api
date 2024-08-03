const { createController } = require('./controller');
const { Model } = require('./dbSchema');
const { requestSchema } = require('./requestSchema');
const { validator } = require('./validator');

module.exports = {
  createController,
  createRequestSchema: requestSchema,
  createModel: Model,
  createValidator: validator,
};
