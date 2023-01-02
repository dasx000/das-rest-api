const downloader = require('../controllers/downloader.controller');
const router = require('express').Router();

module.exports = (das) => {
  router.get('/gdrive', downloader.googleDrive);
  router.get('/tiktok', downloader.tiktok);
  router.get('/instagram', downloader.instagram);
  router.get('/fbvideo', downloader.fbVideo);
  router.get('/mediafire', downloader.mediafire);
  router.get('/scihub', downloader.sci);

  // router.post('/upload', tools.fileUpload);

  das.use('/docs/downloader', router);
};
