module.exports = (das) => {
  const users = require('../controllers/user.controller');
  const router = require('express').Router();

  router.post('/register', users.register);
  router.post('/login', users.login);

  das.use('/api/users', router);
};
