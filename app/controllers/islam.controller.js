const { data, fail } = require('../../message');
const axios = require('axios');

exports.search_word = async (req, res) => {
  const q = req.query.q;

  await axios
    .get(`https://api.alquran.cloud/v1/search/${q}/all/id`)
    .then((result) => {
      res.send(data(result.data.data));
    })
    .catch((err) => {
      res.status(406).send(fail(406, `error`));
    });
};
exports.list_surah = async (req, res) => {
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
