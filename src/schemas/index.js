const schemas = {};

schemas.user = {};
schemas.user.list = require('./user/list.json');
schemas.user.get = require('./user/get.json');
schemas.user.post = require('./user/post.json');
schemas.user.put = require('./user/put.json');
schemas.user.delete = require('./user/delete.json');

module.exports = schemas;
