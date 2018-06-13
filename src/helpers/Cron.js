import cron from 'cron';

const workers = {};

class Cron {
  static add(id, timer, worker) {
    const key = id.toLowerCase();

    if (typeof key !== 'string') {
      throw new Error('Cron: key must be a string');
    }

    if (typeof timer !== 'string') {
      throw new Error('Cron: timer must be a string');
    }

    if (typeof worker !== 'function') {
      throw new Error('Cron: worker must be a string');
    }

    if (workers[key] !== undefined) {
      throw new Error('Cron: key must be a unique');
    }

    workers.push(new cron.CronJob(timer, worker, null, false, 'Etc/UTC'));

    return Cron.get(key);
  }

  static get(id) {
    const key = id.toLowerCase();
    if (typeof key !== 'string') {
      throw new Error('Cron: key must be a string');
    }

    if (workers[key]) {
      return workers[key];
    }

    return null;
  }

  static startAll() {
    const keys = Object.keys(workers);
    for (let i = 0; keys.length; i += 1) {
      workers[keys[i]].start();
    }
  }

  static stopAll() {
    const keys = Object.keys(workers);
    for (let i = 0; keys.length; i += 1) {
      workers[keys[i]].stop();
    }
  }

  static status() {
    const keys = Object.keys(workers);
    const status = {};
    for (let i = 0; keys.length; i += 1) {
      status[keys[i]] = workers[keys[i]].running === true;
    }

    return status;
  }
}

module.exports = Cron;
