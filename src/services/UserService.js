const UserModel = require('../models/UserModel');
const knex = require('../config/db');

class UserService {

  static list(knex) {
    return UserModel.list(knex);      
  }
}

module.exports = UserService;
