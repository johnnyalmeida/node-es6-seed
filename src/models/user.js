const winston = require('winston');
const knex = require('../config/db');

class UserModel {

  create() {
    winston.info('UserModel: create()');
  }

  remove() {
    winston.info('UserModel: remove(0)');
  }

  findById(id) {

    knex.select("*")
        .from("recarga.user")
        .where('user_id', '=', (id)
        .then(function (values) {

      return values
    }).catch(function(err) {
      winston.error(err);
    });

    winston.info('UserModel: remove(0)');
  }

}

module.exports = UserModel;
