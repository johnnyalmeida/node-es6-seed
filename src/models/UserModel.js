const { utc } = require('moment');
const log = require('../config/log');
const userType = require('../types/user');

class UserModel {

  static list(knex) {
    return knex
    .from('user')
    .whereNot('user.status', userType.DELETED)
    .catch(log.database);
  }

  static get(data, knex) {
    return knex
    .from('user')
    .where('user.id', data.userId)
    .whereNot('user.status', userType.DELETED)
    .catch(log.database);
  }

  static post(data, knex) {
    return knex
    .from('user')
    .insert(data)
    .catch(log.database);
  }

  static put(data, knex) {
    const query = knex
    .from('user');

    if (data.name) {
      query.update('name', data.name);
    }

    query
    .where('user.id', data.userId)
    .whereNot('user.status', userType.DELETED)
    .catch(log.database);

    return query;
  }

  static delete(data, knex) {
    return knex
    .from('user')
    .where('user.id', data.userId)
    .whereNot('user.status', userType.DELETED)
    .update({
      status: userType.DELETED,
      deleted_at: utc().format('YYYY-MM-DD HH:mm:ss'),
    })
    .catch(log.database);
  }

}

module.exports = UserModel;
