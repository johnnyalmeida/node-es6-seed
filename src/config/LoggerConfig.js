const winston = require('winston');
const morgan = require('morgan');
const moment = require('moment-timezone');
const winstonStream = require('winston-stream');
const { clone, each, isEmpty } = require('lodash');
const Logger = require('../helpers/Logger');

const rules = {
  paths: {},
  methods: {},
  status: {},
};

class LoggerConfig {
  static winston() {
    winston.configure({
      exitOnError: false,
      levels: LoggerConfig.getLevels(),
      colors: LoggerConfig.getColors(),
      transports: LoggerConfig.getTransports(),
    });
  }

  static morgan() {
    LoggerConfig.loadSkipPaths();
    LoggerConfig.loadSkipMethods();
    LoggerConfig.loadSkipStatus();
    LoggerConfig.loadSkipKeys();

    let stream = null;
    switch (process.env.LOGGER_STREAM_TYPE) {
      default: stream = winstonStream(winston, 'info');
    }

    return morgan((tokens, req, res) => {
      const ip = tokens['remote-addr'](req, res);
      const { pathname } = req._parsedUrl;

      const info = {
        date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        method: tokens.method(req, res),
        pathname,
        status: parseInt(tokens.status(req, res), 10),
        responseTime: tokens['response-time'](req, res),
        client: {
          locale: req.locale,
          ipv4: ip === '::1' ? '127.0.0.1' : ip,
          userAgent: tokens['user-agent'](req, res),
        },
      };

      if (req.headers['content-type'] === 'application/json') {
        if (!isEmpty(req.body)) {
          info.body = LoggerConfig.replacePropertyValue(rules.keys, req.body);
        }
      }

      if (!isEmpty(req.query)) {
        info.query = LoggerConfig.replacePropertyValue(rules.keys, req.query);
      }

      if (req.params) {
        const keys = Object.keys(req.params);
        if (keys.length > 0) {
          info.params = {};

          for (let i = 0; i < keys.length; i += 1) {
            if (keys[i] !== '0') {
              info.params[keys[i]] = req.params[keys[i]];
            }
          }
        }
      }

      return info;
    }, {
      stream,
      skip: LoggerConfig.skip,
    });
  }

  // default skip '/', '/status' and '/favicon.ico'
  static loadSkipPaths() {
    const paths = process.env.LOGGER_SKIP_PATHS || '';
    const rows = `${paths}|/|/status|/favicon.ico`.split('|');
    rules.paths = {};

    for (let i = 0; i < rows.length; i += 1) {
      if (rows[i] !== '') {
        rules.paths[rows[i]] = true;
      }
    }
  }

  // default skip OPTIONS and GET
  static loadSkipMethods() {
    const methods = (process.env.LOGGER_SKIP_METHODS || 'GET').toUpperCase();
    const rows = `${methods}|OPTIONS`.split('|');
    rules.methods = {};

    for (let i = 0; i < rows.length; i += 1) {
      if (rows[i] !== '') {
        rules.methods[rows[i]] = true;
      }
    }
  }

  static loadSkipKeys() {
    const keys = process.env.LOGGER_SKIP_KEYS || '';
    const rows = keys.split('|');
    rules.keys = {};

    for (let i = 0; i < rows.length; i += 1) {
      if (rows[i] !== '') {
        rules.keys[rows[i]] = true;
      }
    }

    rules.keys = Object.keys(rules.keys);
  }

  // default skip 404
  static loadSkipStatus() {
    const status = process.env.LOGGER_SKIP_STATUS || '404';
    const rows = status.split('|');
    rules.status = {};

    for (let i = 0; i < rows.length; i += 1) {
      if (rows[i] !== '') {
        rules.status[rows[i]] = true;
      }
    }
  }

  static getTransports() {
    const transports = [
      new winston.transports.Console({
        timestamp: () => {
          return moment.utc().format('YYYY-MM-DD HH:mm:ss');
        },
        json: false,
        colorize: true,
      }),
    ];

    return transports;
  }

  static getLevels() {
    return {
      emerg: 0,
      alert: 1,
      crit: 2,
      error: 3,
      warning: 4,
      notice: 5,
      info: 6,
      debug: 7, // 'debug' entries were not displayed
    };
  }

  static getColors() {
    return {
      emerg: 'bgRed',
      alert: 'bgMagenta',
      crit: 'bgRed',
      error: 'red',
      warning: 'yellow',
      notice: 'bgBlue',
      info: 'green',
      debug: 'white',
    };
  }

  static replacePropertyValue(keys, object) {
    const newObject = clone(object);

    each(object, (val, key) => {
      if (keys.indexOf(key) !== -1) {
        newObject[key] = '******';
      } else if (typeof (val) === 'object') {
        newObject[key] = LoggerConfig.replacePropertyValue(keys, val);
      }
    });

    return newObject;
  }

  static error(err, req, res, next) { // eslint-disable-line
    Logger.error(err);
    res.status(err.status || 500);
    res.send({ code: 0, message: 'Falha interna do servidor' });
  }

  static getLevelByStatusCode(code) {
    let level = 'info';
    if (code >= 400) { level = 'warning'; }
    if (code >= 500) { level = 'error'; }
    if (code === 401 || code === 403) { level = 'crit'; }
    return level;
  }

  static skip(req, res) {
    const { pathname } = req._parsedUrl;
    const { method } = req.method;
    const status = String(res.statusCode);

    if (rules.methods[method]) {
      return true;
    }

    if (rules.paths[pathname]) {
      return true;
    }

    if (rules.status[status]) {
      return true;
    }

    return false;
  }
}

module.exports = LoggerConfig;
