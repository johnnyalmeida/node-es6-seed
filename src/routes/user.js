const express = require('express');
const UserController = require('../controllers/user');

const router = express.Router();
const uc = new UserController();


router.get('/', (req, res) => {
  uc.findAll(req, res);
});

module.exports = router;
