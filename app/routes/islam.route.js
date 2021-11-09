// start of islam.route.js
module.exports = (das) => {
  const islam = require('../controllers/islam.controller');
  const router = require('express').Router();

  router.get('/search_word', islam.search_word);
  router.get('/list_surah', islam.list_surah);
  router.get('/search_surah', islam.search_surah);
  router.get('/tafsir_surah', islam.tafsir_surah);

  das.use('/api/islam', router);
};
//end of islam.route.js
