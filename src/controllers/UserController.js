const UserService = require('../services/UserService');
const knex = require('../config/db');

class UserController {

  static list(req, res) {
    UserService.list(knex)
      .then((rows) => {
        res.status(200).sendAndLog({ success: true, data: rows });
      })
      .catch(() => {
        res.status(500).sendAndLog({ success: false, code: '3272358416', message: 'Falha ao listar usuários.' });
      });
  }

  static get(req, res) {
    UserService.get(req.params, knex)
      .then((user) => {
        if (!user) {
          res.status(200).sendAndLog({ success: false, code: '7731668134', message: 'Usuário não encontrado.' });
          return;
        }
        res.status(200).sendAndLog({ success: true, user });
      })
      .catch(() => {
        res.status(500).sendAndLog({ success: false, code: '6001059324', message: 'Falha ao buscar usuário.' });
      });
  }

  static post(req, res) {
    UserService.post(req.body, knex)
      .then((ids) => {
        res.status(201).sendAndLog({ success: true, id: ids[0] });
      })
      .catch(() => {
        res.status(500).sendAndLog({ success: false, code: '2365958507', message: 'Falha criar usuário.' });
      });
  }

  static put(req, res) {
    const data = {
      userId: req.params.userId,
      name: req.body.name,
    };

    UserService.put(data, knex)
      .then((user) => {
        if (!user) {
          res.status(200).sendAndLog({ success: false, code: '7502749763', message: 'Usuário não encontrado.' });
          return;
        }
        res.status(200).sendAndLog({ success: true });
      })
      .catch(() => {
        res.status(500).sendAndLog({ success: false, code: '5768905470', message: 'Falha ao atualizar usuário.' });
      });
  }

  static delete(req, res) {
    UserService.delete(req.params, knex)
      .then((user) => {
        if (!user) {
          res.status(200).sendAndLog({ success: false, code: '9517673561', message: 'Usuário não encontrado.' });
          return;
        }
        res.status(200).sendAndLog({ success: true });
      })
      .catch(() => {
        res.status(500).sendAndLog({ success: false, code: '7019803632', message: 'Falha ao deletar usuário.' });
      });
  }

}

module.exports = UserController;
