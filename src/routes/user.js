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

/* GET /user/:userId */
router.get('/:userId', (req, res) => {
  const query = _.extend({}, req.params, req.query);
  const valid = validation.schema(res, query, schemas.user.get);

  if (valid) {
    UserController.get(req, res);
  }
});

/* POST /user */
router.post('/', (req, res) => {
  const valid = validation.schema(res, req.body, schemas.user.post);

  if (valid) {
    UserController.post(req, res);
  }
});

/* PUT /user/:userId */
router.put('/:userId', (req, res) => {
  const query = _.extend({}, req.params, req.body);
  const valid = validation.schema(res, query, schemas.user.put);

  if (valid) {
    UserController.put(req, res);
  }
});

/* DELETE /user/:userId */
router.delete('/:userId', (req, res) => {
  const valid = validation.schema(res, req.params, schemas.user.delete);

  if (valid) {
    UserController.delete(req, res);
  }
});

module.exports = router;
