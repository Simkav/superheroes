const express = require('express');
const router = require('./routes');
const app = express();
const errorHandler = require('./middlewares/errorHandler.mw');
const createPublicFolder = require('./utils/createPublicFolder');
const { STATIC_IMAGES_PATH } = require('./config/index');

require('dotenv').config();

createPublicFolder();

app.use(express.json());

app.use(express.static(STATIC_IMAGES_PATH));

app.use('/api', router);

app.use(errorHandler);

module.exports = app;
