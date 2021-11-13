const { data, fail, invalidKey } = require('../../message');
const { scihub } = require('../../lib/scihub');
const axios = require('axios');
const { ytMp3, ytMp4, ytPlay } = require('../../lib/youtube');
const { shortUrl, translate } = require('../../lib/tools');
const {
  getApikey,
  getRole,
  findAllUser,
  cekKey,
} = require('../../database/function');
const { imgbb } = require('../../lib/tools');
const { TiktokDownloader } = require('./../../lib/tiktok');
// 0857a2cccddb46eaaa9c04c51e53f532
////////////////////////////////////////////////////////////////////////////////////////

exports.sci = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());
  const link = req.query.doi;
  const result = await scihub(link);

  if (result.includes('http')) {
    res.send(data(result));
  } else {
    res.status(406).send(fail(result));
  }
};

exports.short_url = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());
  const url = req.query.url;
  await axios
    .get(`https://tinyurl.com/api-create.php?url=${url}`)
    .then((result) => {
      res.send(data(result.data));
    })
    .catch((err) => {
      // res.status(406).send(fail(err));
      res.status(406).send(fail(`Error`));
    });
};

exports.ytMP3 = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());
  const url = req.query.url;
  await ytMp3(url)
    .then((results) => {
      const {
        title,
        result,
        size,
        thumb,
        views,
        likes,
        dislike,
        channel,
        uploadDate,
        desc,
      } = results;
      res.send(
        data(
          {
            title,
            result,
            size,
            thumb,
            views,
            likes,
            dislike,
            channel,
            uploadDate,
            desc,
          },
          'Succes. Module by Zekais'
        )
      );
    })
    .catch((err) => {
      res.status(406).send(fail('error'));
    });
};
exports.ytMP4 = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());
  const url = req.query.url;
  await ytMp4(url)
    .then((results) => {
      const {
        title,
        result,
        quality,
        size,
        thumb,
        views,
        likes,
        dislike,
        channel,
        uploadDate,
        desc,
      } = results;
      res.send(
        data(
          {
            title,
            result,
            quality,
            size,
            thumb,
            views,
            likes,
            dislike,
            channel,
            uploadDate,
            desc,
          },
          'Succes. Module by Zekais'
        )
      );
    })
    .catch((err) => {
      res.status(406).send(fail('error ytmp4'));
    });
};

exports.ytPLAY = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());
  const q = req.query.q;
  await ytPlay(q)
    .then((result) => {
      res.send(data(result, 'Succes. Module by Zekais'));
    })
    .catch((err) => {
      res.status(406).send(fail('error'));
    });
};

// ss mobile
exports.ssPC = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());

  const url = `https://cdn.statically.io/screenshot/${req.query.url}`;
  await imgbb(url)
    .then((result) => {
      res.send(data(result.data.url));
    })

    .catch((err) => {
      res.send(fail(err.message));
    });
};
exports.ssHP = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());

  const url = `https://cdn.statically.io/screenshot/device=mobile/${req.query.url}`;
  await imgbb(url)
    .then((result) => {
      res.send(data(result.data.url));
    })
    .catch((err) => {
      res.send(fail(err.message));
    });
};

// function file upload using express - fileupload

exports.tiktokWm = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());

  const url = req.query.url;
  if (!url) return res.send(fail('url tidak boleh kosong'));
  await TiktokDownloader(url)
    .then(async (result) => {
      const result2 = await shortUrl(result.result.watermark);
      console.log(result2);
      res.send(data(result2));
    })
    .catch((err) => {
      res.send(fail(err.message));
    });
};
exports.tiktokNoWm = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());

  const url = req.query.url;
  if (!url) return res.send(fail('url tidak boleh kosong'));
  await TiktokDownloader(url)
    .then(async (result) => {
      const output = await shortUrl(result.result.nowatermark);
      res.send(data(output));
    })
    .catch((err) => {
      res.send(fail(err.message));
    });
};

// translate
exports.translateLang = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());
  const text = req.query.text;
  const lang = req.params.lang;
  if (!text) return res.send(fail('text tidak boleh kosong'));
  await translate(text, lang)
    .then(async (result) => {
      res.send(data({ To: lang, result }));
    })
    .catch((err) => {
      res.send(fail(err.message));
    });
};
