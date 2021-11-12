const { data, fail, invalidKey } = require('../../message');
const { scihub } = require('../../lib/scihub');
const axios = require('axios');
const { ytMp3, ytMp4, ytPlay } = require('../../lib/youtube');
const {
  getApikey,
  getRole,
  findAllUser,
  cekKey,
} = require('../../database/function');
const { imgbb } = require('../../lib/tools');

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
  const ssResult = await axios.get(
    `https://cdn.statically.io/screenshot/${req.query.url}`
  );
  const url = ssResult;
  await imgbb(url)
    .then((result) => {
      res.send(data(result));
    })

    .catch((err) => {
      res.send(fail(err.message));
    });
};
exports.ssHP = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());

  const url = `https://cdn.statically.io/screenshot/device=mobile/${req.query.url}`;
  const anu = await imgbb(url);
  console.log(anu);
  // .then((result) => {

  //   console.log(result);
  //   res.send(data(result));
  // })
  // .catch((err) => {
  //   res.send(fail(err.message));
  // });
};

// function file upload using express - fileupload
