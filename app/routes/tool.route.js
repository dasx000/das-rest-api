module.exports = (das) => {
  const tools = require('../controllers/tool.controller');
  const router = require('express').Router();

  router.get('/scihub', tools.sci);

  das.use('/api/tools', router);
};
