module.exports = (das) => {
  const students = require('../controllers/islam.controller');
  const router = require('express').Router();

  router.get('/search_word', students.search_word);

  das.use('/api/islam', router);
};
