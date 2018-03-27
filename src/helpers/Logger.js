const winston = require('winston');

/* Logger use RFC5424 */
class Logger {
  static emerg(...emerg) {
    winston.log('emerg', JSON.stringify(emerg));
  }

  static alert(...alert) {
    winston.log('alert', JSON.stringify(alert));
  }

  static crit(...crit) {
    winston.log('crit', JSON.stringify(crit));
  }

  static error(...error) {
    winston.log('error', JSON.stringify(error));
  }

  static warning(...warning) {
    winston.log('warning', JSON.stringify(warning));
  }

  static notice(...notice) {
    winston.log('notice', JSON.stringify(notice));
  }

  static info(...info) {
    winston.log('info', JSON.stringify(info));
  }

  static throw(res, code, ...args) {
    Logger.error(...args);
    res.status(500).send({ success: false, code, message: res.__('helpers.logger.throw') });
  }
}

module.exports = Logger;
