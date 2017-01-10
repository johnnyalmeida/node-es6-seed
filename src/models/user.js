const winston = require('winston');

class UserModel {

  constructor(db) {
    this.db = db;
  }

  findById(id) {
    this.db.select('*')
        .from('recarga.user')
        .where('user_id', '=', (id))
        .then((values) => {
          winston.info(values);
          return values;
        })
        .catch((err) => {
          winston.error(err);
        });
  }

}

module.exports = UserModel;
