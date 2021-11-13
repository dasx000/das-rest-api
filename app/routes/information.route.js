const information = require('../controllers/information.controller');
const router = require('express').Router();
module.exports = (das) => {
  router.get('/news', information.newsapi);
  router.get('/kbbi', information.kbbiSearch);
  router.get('/kbbi2', information.kbbiSearch2);

  das.use('/api/information', router);
};
