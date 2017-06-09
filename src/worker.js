/* .env lib */
require('dotenv').config();

/* Dependencies */
/* https://github.com/kelektiv/node-cron */
const CronJob = require('cron').CronJob;

/* Logger */
const LoggerConfig = require('./config/LoggerConfig');
const Logger = require('./helpers/Logger');

LoggerConfig.init();

/* Services */
const services = [];

services.push(new CronJob('* * * * * *', () => {
  console.log('You will see this message every second');
}, null, false));





/* Start services */
services.map((service) => {
  return service.start();
});

Logger.info(`Worker started ${services.length} services`);
