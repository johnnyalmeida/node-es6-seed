const winston = require('winston');

class UserModel {

  constructor(db) {
    this.db = db;
  }

  findAll() {
    return this.db.select('*')
        .from('recarga.user')
        .then((rows) => {
          return rows;
        })
        .catch((err) => {
          winston.error(err);
        });
  }

}

module.exports = UserModel;
