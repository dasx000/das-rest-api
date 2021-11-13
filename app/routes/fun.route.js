const fun = require('../controllers/fun.controller');
const router = require('express').Router();

module.exports = (das) => {
  router.get('/simi', fun.simi);
  router.get('/anime-quotes', fun.animeQuotes);
  router.get('/trending-twitter', fun.trendsTwt);
  router.get('/location', fun.location);

  // router.post('/upload', tools.fileUpload);

  das.use('/api/fun', router);
};
