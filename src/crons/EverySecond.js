const Logger = require('../helpers/Logger');

class EverySecond {

  static runner() {
    Logger.info('You will see this message every second');
  }
}

module.exports = EverySecond;
