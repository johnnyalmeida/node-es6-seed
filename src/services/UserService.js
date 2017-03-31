const UserModel = require('../models/UserModel');
const Convert = require('../helpers/conversion');

class UserService {

  static list(knex) {
    return UserModel.list(knex)
    .then((dbList) => {
      if (dbList.length === 0) {
        return dbList;
      }

      const result = dbList.map(user => ({
        id: user.id,
        name: user.name,
        status: user.status,
        createdAt: Convert.toUnixEpoch(user.created_at),
        updatedAt: Convert.toUnixEpoch(user.updated_at),
        deletedAt: Convert.toUnixEpoch(user.deleted_at),
      }));
      return result;
    });
  }

  static get(data, knex) {
    return UserModel.get(data, knex)
      .then((dbUser) => {
        if (!dbUser[0]) {
          return null;
        }

        const result = {
          id: dbUser[0].id,
          name: dbUser[0].name,
          status: dbUser[0].status,
          createdAt: Convert.toUnixEpoch(dbUser[0].created_at),
          updatedAt: Convert.toUnixEpoch(dbUser[0].updated_at),
          deletedAt: Convert.toUnixEpoch(dbUser[0].deleted_at),
        };
        return result;
      });
  }

  static post(data, knex) {
    return UserModel.post(data, knex);
  }

  static put(data, knex) {
    return UserModel.put(data, knex);
  }

  static delete(data, knex) {
    return UserModel.delete(data, knex);
  }
}

module.exports = UserService;
