const requestSchema = {
  completed: {
    errorMessage: `Param 'completed' must be boolean`,
    optional: true,
    isBoolean: true,
  },
  limit: {
    errorMessage: `Param 'limit' must be number`,
    optional: true,
    isNumeric: true,
  },
  page: {
    errorMessage: `Param 'page' must be number`,
    optional: true,
    isNumeric: true,
  },
};

module.exports = { requestSchema };
