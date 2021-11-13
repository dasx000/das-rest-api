const information = require('../controllers/information.controller');
const router = require('express').Router();
module.exports = (das) => {
  router.get('/news', information.newsapi);
  router.get('/kbbi', information.kbbiSearch);
  router.get('/kbbi2', information.kbbiSearch2);
  router.get('/kode-post', information.kodePost);
  router.get('/lambang-provinsi', information.lambangProvinsi);
  router.get('/harga-komoditas', information.hargaKomoditas);
  router.get('/cari-sekolah', information.cariSekolah);

  das.use('/api/information', router);
};
