const { data, fail, invalidKey } = require('../../message');
const axios = require('axios');
const {
  getApikey,
  getRole,
  findAllUser,
  cekKey,
} = require('../../database/function');
const { imgbb } = require('../../lib/tools');
const apiNews = '0857a2cccddb46eaaa9c04c51e53f532';
////////////////////////////////////////////////////////////////////////////////////////

exports.newsapi = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());

  await axios
    .get(`https://newsapi.org/v2/top-headlines?country=id&apiKey=${apiNews}`)
    .then((result) => {
      const obj = {
        totalResults: result.data.totalResults,
        articles: result.data.articles,
      };
      res.send(data(obj));
    })
    .catch((err) => {
      res.send(fail(err.message));
    });
};

exports.kbbiSearch = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());
  const q = req.query.q;
  if (!q) {
    return res.send(fail('masukkan query!'));
  }

  await axios
    .get(`https://kbbi-api-amm.herokuapp.com/search?q=${q}`)
    .then((result) => {
      const { resultLists, total } = result.data.data;
      res.send(data({ total, resultLists }, `success. Thank to azharimm`));
    })
    .catch((err) => {
      res.send(fail(err.message));
    });
};
exports.kbbiSearch2 = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());
  const q = req.query.q;
  if (!q) {
    return res.send(fail('masukkan query!'));
  }

  await axios
    .get(`https://new-kbbi-api.herokuapp.com/cari/${q}`)
    .then((result) => {
      res.send(data(result.data.data, `success. Thank to btrianurdin`));
    })
    .catch((err) => {
      res.send(fail(err.message));
    });
};
exports.cariSekolah = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());
  const q = req.query.q;
  if (!q) {
    return res.send(fail('masukkan query!'));
  }

  await axios
    .get(`https://api-sekolah-indonesia.herokuapp.com/sekolah/s?sekolah=${q}`)
    .then((result) => {
      res.send(
        data(
          {
            data_sekolah: result.data.dataSekolah,
            total: result.data.total_data,
          },
          `success. Thank to Alwan`
        )
      );
    })
    .catch((err) => {
      res.send(fail(err.message));
    });
};
exports.hargaKomoditas = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());

  await axios
    .get(`https://jibs.my.id/api/harga_komoditas`)
    .then((result) => {
      res.send(data(result.data));
    })
    .catch((err) => {
      res.send(fail(err.message));
    });
};
exports.lambangProvinsi = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());

  await axios
    .get(`https://feriirawan-api.herokuapp.com/list/symbols/province/500`)
    .then((result) => {
      res.send(data(result.data.lambang, `success. creator:feriirawan`));
    })
    .catch((err) => {
      res.send(fail(err.message));
    });
};
exports.kodePost = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());
  const q = req.query.q;
  if (!q) {
    return res.send(fail('masukkan query!'));
  }

  await axios
    .get(`https://kodepos.vercel.app/search?q=${q}`)
    .then((result) => {
      res.send(data(result.data.data, `success. Thank to suluh`));
    })
    .catch((err) => {
      res.send(fail(err.message));
    });
};
