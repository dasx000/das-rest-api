// start of islam.route.js
module.exports = (das) => {
  const students = require('../controllers/islam.controller');
  const router = require('express').Router();

  router.get('/search_word', students.search_word);
  router.get('/list_surah', students.list_surah);
  router.get('/search_surah', students.search_surah);
  router.get('/tafsir_surah', students.tafsir_surah);

  das.use('/api/islam', router);
};
//end of islam.route.js
