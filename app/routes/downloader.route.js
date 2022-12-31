const downloader = require('../controllers/downloader.controller');
const router = require('express').Router();

module.exports = (das) => {
  router.get('/gdrive', downloader.googleDrive);
  router.get('/tiktok', downloader.tiktok);

  // router.post('/upload', tools.fileUpload);

  das.use('/docs/downloader', router);
};
