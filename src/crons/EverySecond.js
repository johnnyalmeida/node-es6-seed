import Logger from '../helpers/Logger';

class EverySecond {
  static runner() {
    Logger.info(__('cron.everySecond.tick'));
  }
}

export default EverySecond;
