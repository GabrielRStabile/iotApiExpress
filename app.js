const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const eventsRouter = require('./routes/events');
const eventTypeRouter = require('./routes/eventType');

require('dotenv').config();

const app = express();

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log('Successfully connected to MongoDB!'))
  .catch((err) => {
    console.log('Error connecting to MongoDB: ');
    console.log(err);
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/events', eventsRouter);
app.use('/eventType', eventTypeRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
