const fun = require('../controllers/fun.controller');
const router = require('express').Router();

module.exports = (das) => {
  router.get('/simi', fun.simi);

  // router.post('/upload', tools.fileUpload);

  das.use('/api/fun', router);
};
