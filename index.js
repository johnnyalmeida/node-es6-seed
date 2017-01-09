#!/usr/bin/env nodejs
const express = require('express');
const winston = require('winston');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json({
  limit: process.env.BODY_LIMIT,
}));

require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Up and running...');
  winston.info('get');
});

app.listen(process.env.PORT, () => {
  winston.info('Listening on port 3000...');
});
