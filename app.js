const express = require('express');
const router = require('./routes');
const app = express();
const errorHandler = require('./middlewares/errorHandler.mw');
const createPublicFolder = require('./utils/createPublicFolder');

createPublicFolder();

app.use(express.json());

app.use('/api', router);

app.use(errorHandler);

module.exports = app;
