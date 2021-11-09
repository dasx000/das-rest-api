const { data, fail, invalidKey } = require('../../message');
const axios = require('axios');
const {
  getApikey,
  getRole,
  findAllUser,
  cekKey,
} = require('../../database/function');

exports.search_word = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());
  const q = req.query.q;

  await axios
    .get(`https://api.alquran.cloud/v1/search/${q}/all/id`)
    .then((result) => {
      res.send(data(result.data.data, `By equran.id`));
    })
    .catch((err) => {
      res.status(406).send(fail(406, `error`));
    });
};

exports.list_surah = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());
  await axios
    .get(`https://equran.id/api/surat`)
    .then((result) => {
      res.send(data(result.data, `By equran.id`));
    })
    .catch((err) => {
      res.status(406).send(fail(406, `error`));
    });
};
exports.search_surah = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());
  const nomor = req.query.nomor_surah;
  await axios
    .get(`https://equran.id/api/surat/${nomor}`)
    .then((result) => {
      if (!result.data.status)
        return res.status(404).send(fail(404, result.data.message));
      res.send(data(result.data, `By equran.id`));
    })
    .catch((err) => {
      res.status(406).send(fail(406, `error`));
    });
};
exports.tafsir_surah = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());
  const nomor = req.query.nomor_surah;
  await axios
    .get(`https://equran.id/api/tafsir/${nomor}`)
    .then((result) => {
      if (!result.data.status)
        return res.status(404).send(fail(404, result.data.message));
      res.send(data(result.data, `By equran.id`));
    })
    .catch((err) => {
      res.status(406).send(fail(406, `error`));
    });
};
