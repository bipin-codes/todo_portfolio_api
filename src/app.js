const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('../swaggerConfig');

const { app } = require('./server');

const v1Router = require('./routes/v1');
const v2Router = require('./routes/v2');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.set('view engine', 'pug');

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

app.use((req, res, next) => {
  res.status(404).render('not-found');
});

app.use((err, req, res, next) => {
  console.log('Error Handler Middleware....');
});
