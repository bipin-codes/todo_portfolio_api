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
};

module.exports = { requestSchema };
