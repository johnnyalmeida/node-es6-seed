const schemas = {};

schemas.user = {};
schemas.user.list = require('./user/list.json');
schemas.user.get = require('./user/get.json');
schemas.user.create = require('./user/create.json');
schemas.user.update = require('./user/update.json');
schemas.user.delete = require('./user/delete.json');

module.exports = schemas;
