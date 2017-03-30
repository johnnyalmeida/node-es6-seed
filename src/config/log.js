const winston = require('winston');

winston.configure({
  exitOnError: false,
  levels: {
    error: 0,
    warning: 1,
    info: 2,
  },
  colors: {
    error: 'red',
    warning: 'yellow',
    info: 'green',
  },
  transports: [
    new (winston.transports.Console)({
      colorize: true,
    }),
    new winston.transports.File({
      filename: '../log',
      name: 'log',
      json: false,
    }),
  ],
});


class Log {

  static error(...args) {
    winston.error(...args);
  }

  static warning(...args) {
    winston.warning(...args);
  }

  static info(...args) {
    winston.info(...args);
  }

  static database(...err) {
    winston.error(...err);
    throw new Error('Database Error');
  }
}

module.exports = Log;
