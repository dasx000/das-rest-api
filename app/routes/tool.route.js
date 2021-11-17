module.exports = (das) => {
  const tools = require('../controllers/tool.controller');
  const router = require('express').Router();

  router.get('/scihub', tools.sci);
  router.get('/short-url', tools.short_url);
  router.get('/ytmp3', tools.ytMP3);
  router.get('/ytmp4', tools.ytMP4);
  router.get('/ytplay', tools.ytPLAY);
  router.get('/sshp', tools.ssHP);
  router.get('/sspc', tools.ssPC);
  router.get('/tiktok-wm', tools.tiktokWm);
  router.get('/tiktok-nowm', tools.tiktokNoWm);
  router.get('/translate/:lang', tools.translateLang);
  router.get('/temp-mail', tools.tempMail);
  router.get('/emails', tools.emails);
  router.get('/removebg', tools.removeBg);
  // router.post('/upload', tools.fileUpload);

  das.use('/api/tools', router);
};
