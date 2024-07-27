const { app } = require('./server');

const PORT = process.env.PORT || 3000;

const root = require('./routes/root');

app.set('view engine', 'pug');

app.use('/', root);

app.use((req, res, next) => {
  res.status(404).render('not-found');
});

app.use((err, req, res, next) => {
  console.log('Error Handler Middleware....');
});

const startupHandler = (err) => {
  if (err) {
    console.err(err);
    return;
  }
  console.log(`Server is listening on port ${PORT}`);
};

app.listen(PORT, startupHandler);
