const UserModel = require('../models/user');
const knex = require('../config/db');

class UserController {

  constructor() {
    this.userModel = new UserModel(knex);
  }

  findAll(req, res) {
    this.userModel.findAll()
      .then((rows) => {
        res.send({ success: true, data: rows });
      })
      .catch((err) => {
        res.send({ success: false, message: err });
      });
  }

}

module.exports = UserController;
