const { app } = require('./server');
const PORT = process.env.PORT || 3000;

const startupHandler = (err) => {
  if (err) {
    console.err(err);
    return;
  }
  console.log(`Server is listening on port ${PORT}`);
};

app.listen(PORT, startupHandler);
