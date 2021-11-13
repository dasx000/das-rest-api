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
