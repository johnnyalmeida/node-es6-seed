/* .env lib */
import dotenv from 'dotenv';
import debugModule from 'debug';

/* Dependencies */
import Cron from './helpers/Cron';

/* Logger */
import LoggerConfig from './config/LoggerConfig';
import Settings from './config/Settings';

/* Crons */
import EverySecond from './crons/EverySecond';

/* Init config */
dotenv.config();
const debug = debugModule('worker');

/* Services */
const services = [];

debug('load settings');
(async () => {
  await Settings.load();
  await LoggerConfig.init();

  debug('load workers');
  Cron.add(Settings.get('CRON_EVERY_SECOND'), EverySecond.runner);

  debug('start workers');
  Cron.startAll();

  debug(`Worker started ${services.length} services`);
})();
