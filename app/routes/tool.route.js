module.exports = (das) => {
  const tools = require('../controllers/tool.controller');
  const router = require('express').Router();

  router.get('/scihub', tools.sci);
  router.get('/short-url', tools.short_url);
  router.get('/ytmp3', tools.ytMP3);
  router.get('/ytmp4', tools.ytMP4);
  router.get('/ytplay', tools.ytPLAY);

  das.use('/api/tools', router);
};
