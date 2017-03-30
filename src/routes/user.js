const express = require('express');
const _ = require('lodash');
const schemas = require('../schemas/index');
const validation = require('../helpers/validation.js');
const UserController = require('../controllers/UserController');

const router = express.Router();

/* GET /user */
router.get('/', (req, res) => {
  const query = _.extend({}, req.params, req.query);
  const valid = validation.schema(res, query, schemas.user.list);

  if (valid) {
    UserController.list(req, res);
  }
});

module.exports = router;
