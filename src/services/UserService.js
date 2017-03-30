const UserModel = require('../models/UserModel');
const knex = require('../config/db');

class UserService {

  static list(knex) {
    return new Promise((resolve, reject) => {
      UserModel.list(knex)
      .then((rows) => {
        console.log(rows);
        resolve(rows);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
    });
  }
}

module.exports = UserService;
