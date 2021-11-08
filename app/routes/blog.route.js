const {
  notAuthenticated,
  captchaLogin,
  captchaRegister,
  isAuthenticated,
} = require('../../lib/auth');

module.exports = (das) => {
  const articles = require('../controllers/blog.controller');
  const router = require('express').Router();

  router.get('/', articles.blog);
  router.get('/create', articles.create);
  router.post('/create', articles.store);

  das.use('/blog', router);
};
