/* Debug module init */
import debugModule from 'debug';
/* Dependencies */
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import config from './config/config';
import i18n from './config/i18n';
import knex from './config/db';
import Settings from './config/Settings';
import Logger from './helpers/Logger';

/* Routes */
import userRoutes from './routes/user';

/* Logger */
import LoggerConfig from './config/LoggerConfig';

/* Init debug */
const debug = debugModule('app');

/* Express initialization */
const app = express();

app.config = config;

/* Express utilites */
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(i18n.init);
app.use(bodyParser.json({
  limit: process.env.BODY_LIMIT,
}));

/* Log express request and response */
LoggerConfig.expressRequest(app);

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

/* Log errors */
LoggerConfig.expressError(app);

app.all('*', (req, res) => {
  res.status(404).send({ success: false, code: '404' });
});

debug('load settings');
(async () => {
  await Settings.load();
  await LoggerConfig.init();

  debug('Starting server');
  app.listen(process.env.PORT, () => {
    debug(`Server started on port ${process.env.PORT}`);
  });
})();
