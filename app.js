const express = require('express');
const router = require('./routes');
const app = express();
const errorHandler = require('./middlewares/errorHandler.mw');

app.use(express.json());

app.use('/api', router);

app.use(errorHandler);

module.exports = app;
