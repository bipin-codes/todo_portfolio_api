const { app } = require('./server');
const express = require('express');

const v1Router = require('./routes/v1');
const v2Router = require('./routes/v2');
const logger = require('./utils/logger');

app.set('view engine', 'pug');

app.use(logger);
app.use(express.json());

app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

app.use((req, res, next) => {
  console.log('Not Found Handler!!!');
  res.status(404).render('not-found');
});

app.use((err, req, res, next) => {
  const error = JSON.parse(err.message);
  if (Array.isArray(error) && error.length) {
    return res.status(400).json({ message: error });
  }

  next(err);
});

app.use((err, req, res, next) => {
  return res.status(500).json({ message: 'Something went wrong!' });
});
