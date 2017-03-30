const UserService = require('../services/UserService');
const knex = require('../config/db');

class UserController {

  static list(req, res) {
    UserService.list(knex)
      .then((rows) => {
        res.sendAndLog({ success: true, data: rows });
      })
      .catch((err) => {
        res.sendAndLog({ success: false, code: '1259185305', message: 'Falha ao listar Usuários' });
      });
  }

}

module.exports = UserController;
