const winston = require('winston');
const UserModel = require('../models/user');
const knex = require('../config/db');

class UserController {

  constructor() {
    this.userModel = new UserModel(knex);
  }

  findById() {
    winston.info('UserController: findById()');
    return this.userModel.findById(1);
  }

}

module.exports = UserController;
