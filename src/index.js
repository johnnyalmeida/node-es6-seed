/* Dependencies */
const express = require('express');
const winston = require('winston');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

/* Sample of helpers */
const FourMath = require('./helpers/fourMath');
/* Sample of controller */
const UserController = require('./controllers/user');

const userController = new UserController();

/* Express initialization */
const app = express();

const knex = require('./config/db');

/* .env lib */
require('dotenv').config();

/* Express Utilites */
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({
  limit: process.env.BODY_LIMIT,
}));

/* Status endpoint */
app.get('/status', (req, res) => {
  let users = []

  knex.select("*")
      .from("recarga.user")
      .then(function (values) {
      users.push(values);

    const response = {
      data: {
        success: true,
        message: FourMath.sum(20, 22),
        datas: users,
      },
      summary: {},
    };

    userController.create();
    res.send(response);
    winston.info('/status');

  }).catch(function(err) {
    console.log(err);
  });

});

/* Startup message */
app.listen(process.env.PORT, () => {
  winston.info('Server started...');
});


/* Close database */
process.on("exit", function() {
  knex.close();
  knex.disconnect();
})

