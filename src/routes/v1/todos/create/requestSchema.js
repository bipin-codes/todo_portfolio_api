const requestSchema = {
  task: {
    isLength: { options: { min: 5, max: 255 } },
    errorMessage: 'Task must be between 5 - 255 characters in length',
  },
};

module.exports = { requestSchema };
