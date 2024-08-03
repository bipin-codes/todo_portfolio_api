const requestSchema = {
  task: {
    isLength: { options: { min: 10, max: 255 } },
    errorMessage: 'Task must be between 2 - 255 characters in length',
  },
};

module.exports = { requestSchema };
