/* Dependencies */
const express = require('express');
const winston = require('winston');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

/* Routes */
const userRoutes = require('./routes/user');

/* Express initialization */
const app = express();

const knex = require('./config/db');

/* .env lib */
require('dotenv').config();

/* Express utilites */
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({
  limit: process.env.BODY_LIMIT,
}));

/* Status endpoint */
app.get('/status', (req, res) => {
  res.send('ok');
});

/* Instatiate routes */
app.use('/users', userRoutes);

/* Startup message */
app.listen(process.env.PORT, () => {
  winston.info('Server started...');
});

/* Close database */
process.on('exit', () => {
  knex.destroy();
});
