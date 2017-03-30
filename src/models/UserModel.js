const log = require('../config/log');

class UserModel {

  static list(knex) {
    return knex
    .select('*')
    .from('user')
    .catch(e => log.database(e));
  }

}

module.exports = UserModel;
