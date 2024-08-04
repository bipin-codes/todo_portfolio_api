const { default: mongoose } = require('mongoose');

const requestSchema = {
  id: {
    errorMessage: `Param 'id' must be a UUID`,
    checkIfMongoID: {
      custom: (value) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error('Not a valid ID!');
        }
        return true;
      },
    },
  },
  task: {
    isLength: { options: { min: 5, max: 255 } },
    errorMessage: 'Task must be between 5 - 255 characters in length',
  },

  task_details: {
    isLength: { options: { min: 10, max: 1000 } },
    optional: true,
    errorMessage: 'Task details must be between 5 - 255 characters in length',
  },

  completed: {
    errorMessage: `Param 'completed' must be boolean`,
    optional: true,
    isBoolean: true,
  },
};

module.exports = { requestSchema };
