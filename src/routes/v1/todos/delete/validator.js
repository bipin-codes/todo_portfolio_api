const { checkSchema, validationResult } = require('express-validator');
const { requestSchema } = require('./requestSchema');

const validator = async (req, res, next) => {
  await checkSchema(requestSchema, ['body']).run(req);
  const { errors } = validationResult(req);
  console.log('In Validators!');
  console.log(errors);

  if (errors.length) {
    const error = errors.map((error) => ({
      msg: error.msg,
      value: error.path,
    }));

    next(new Error(JSON.stringify(error)));
  }

  next();
};

module.exports = { validator };
