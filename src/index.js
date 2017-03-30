/* .env lib */
require('dotenv').config();

/* Dependencies */
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

/* Routes */
const userRoutes = require('./routes/user');

/* Express initialization */
const app = express();

const log = require('./config/log');

/* Express utilites */
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({
  limit: process.env.BODY_LIMIT,
}));

app.use((req, res, next) => {
  res.sendAndLog = (obj) => {
    log.info([
      req.method,
      req.originalUrl,
      `URLparams: ${JSON.stringify(req.params)}`,
      `Query Params: ${JSON.stringify(req.query)}`,
      `body: ${JSON.stringify(req.body)}`,
      `response: ${JSON.stringify(obj)}`,
    ].join(' | '));

    res.json(obj);
  };

  next();
});

/* Status endpoint */
app.get('/status', (req, res) => {
  res.send('ok');
});

/* Instatiate routes */
app.use('/user', userRoutes);

/* Errors */
app.use((err, req, res, next) => { // no-unused-vars
  log.error(err);
  res.status(500).send({ success: false, code: '2381907443' });
});

app.all('*', (req, res) => {
  log.error('Not Found');
  res.status(404).send({ success: false, code: '0123456789' });
});

/* Startup message */
app.listen(process.env.PORT, () => {
  log.info('Server started on port '.concat(process.env.PORT));
});
