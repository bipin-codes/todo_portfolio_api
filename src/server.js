const express = require('express');
const connectDB = require('./connections/mongo.config');
const app = express();

const PORT = process.env.PORT || 3000;

const startupHandler = (err) => {
  if (err) {
    console.err(err);
    return;
  }
  console.log(`Server is listening on port ${PORT}`);
};

const initialize = async () => {
  try {
    await connectDB();

    app.listen(PORT, startupHandler);
  } catch (e) {
    console.log(`Exception while initialization...`);
    console.log(e);
  }
};

(async () => {
  await initialize();
})();

module.exports = { app };
