/* .env lib */
require('dotenv').config();
const debug = require('debug')('app');

/* Dependencies */
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const i18n = require('./config/i18n');
const { knex } = require('./config/db');
const { morgan, winston, error } = require('./config/LoggerConfig');
const Settings = require('./config/Settings');
const Logger = require('./helpers/Logger');

/* Routes */
const userRoutes = require('./routes/user');

/* Express initialization */
const app = express();


/* Express utilites */
app.use(helmet());
app.use(cors());
app.use(morgan());
app.use(compression());
app.use(i18n.init);
app.use(bodyParser.json({
  limit: process.env.BODY_LIMIT,
}));

/* Status endpoint */
app.get(['/', '/status'], async (req, res) => {
  try {
    await knex.raw('SELECT 1 + 1 as result');
    res.send('ok');
  } catch (err) {
    Logger.error(err);
    res.status(500).send('error');
  }
});

/* Instatiate routes */
app.use('/user', userRoutes);

app.get('/a/:merchantId', (req, res) => res.send({ a: 'a' }));

/* Log errors */
app.use(error);

app.all('*', (req, res) => {
  res.status(404).send({ success: false, code: '404' });
});

debug('load settings');
(async () => {
  winston();
  // await Settings.load();
  // await LoggerConfig.init();

  debug('Starting server');
  app.listen(process.env.PORT, () => {
    debug(`Server started on port ${process.env.PORT}`);
  });
})();
