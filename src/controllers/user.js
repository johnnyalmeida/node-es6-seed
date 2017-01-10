const winston = require('winston');
const UserModel = require('../models/user');
const userModel = new UserModel();

class UserController {

  create() {
    winston.info('UserController: create()');
    userModel.create();
  }

  remove() {
    winston.info('UserController: remove()');
    userModel.remove();
  }

  findById(id) {
    winston.info('UserController: findById()');
    return userModel.findById(id);
  }

}

module.exports = UserController;
