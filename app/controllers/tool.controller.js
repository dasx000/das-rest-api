const port = 8000;
const fs = require('fs');
const ms = require('ms');
const { data, fail, invalidKey } = require('../../message');
const { scihub } = require('../../lib/scihub');
const axios = require('axios');
const { ytMp3, ytMp4, ytPlay } = require('../../lib/youtube');
const {
  RemoveBgResult,
  RemoveBgError,
  removeBackgroundFromImageUrl,
} = require('remove.bg');
const {
  translate,
  imgbbFile,
  sleep,
  color,
  createSerial,
  shortUrl,
  uploader,
  isUrl,
  imgbb,
} = require('../../lib/tools');
const {
  getApikey,
  getRole,
  findAllUser,
  cekKey,
  checkExpiredEmail,
  isPremium,
} = require('../../database/function');
const { TiktokDownloader } = require('./../../lib/tiktok');
let config = require('../../config/config');
const db = require('../models');
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

// cek email masuk
exports.tempMail = async (req, res) => {
  const cekApikey = await isPremium(req.query.apikey);
  if (cekApikey != true) return res.send(fail(cekApikey));
  let q = req.query.name;
  q = q.toLowerCase();
  //=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_
  axios
    .get(
      `https://api.testmail.app/api/json?apikey=${config.apikeyTestmail}&tag=${q}&namespace=${config.namespaceTestmail}&pretty=true`
    )
    .then((resu) => {
      let { result, message, count, limit, offset, emails } = resu.data;
      if (result == 'success') {
        res.send(
          data(
            { inbox: emails[0].text },
            'Data inbox terakhir yang akan ditampilkan. Harap gunakan dengan bijak!'
          )
        );
      } else {
        res.send(fail(message));
      }
    })
    .catch((err) => {
      res.send(
        fail(
          'Apabila email tidak muncul, silahkan refresh atau coba beberapa saat lagi! (error: ' +
            err.message +
            ')'
        )
      );
    });
};
// create email
exports.emails = async (req, res) => {
  const cekApikey = await isPremium(req.query.apikey);
  if (cekApikey != true) return res.send(fail(cekApikey));
  let q = req.query.name.includes(' ')
    ? req.query.name.split(' ').join('.')
    : req.query.name;
  if (!q) return res.send(fail('name tidak boleh kosong'));
  let apikey = req.query.apikey;
  q = q.toLowerCase();

  // HOSTNAME
  let hostname = req.hostname.includes('127.0.0.1')
    ? '127.0.0.1:' + port
    : req.hostname;
  // cek expired
  await checkExpiredEmail(db.emails);
  const cek = await db.emails.findOne({ name: q });
  if (cek == null) {
    const newEmail = new db.emails({
      name: q,
      email: `${config.namespaceTestmail}.${q}@inbox.testmail.app`,
      expired: Date.now() + ms('3d'),
    });
    newEmail
      .save(newEmail)
      .then(async (result) => {
        res.send(
          data(
            {
              name: result.name,
              email: result.email,
              cek_inbox: `${req.protocol}://${hostname}/docs/tools/temp-mail?apikey=${apikey}&name=${q}`,
            },
            'Email akan dihapus otomatis dalam 1 hari!. Harap gunakan dengan bijak!'
          )
        );
      })
      .catch((err) => {
        res.send(fail(err.message));
      });
  } else {
    res.send(
      data(
        {
          name: cek.name,
          email: cek.email,
          cek_inbox: `${req.protocol}://${hostname}/docs/tools/temp-mail?apikey=${apikey}&name=${q}`,
        },
        'Email akan dihapus otomatis dalam 1 hari!. Harap gunakan dengan bijak!'
      )
    );
  }
};

//=_=_ =_=_ =_=_ =_=_ =_=_ =_=_ =_=_ =_=_=_=_ =_=_ =_=_ =_=_=_=_
exports.removeBg = async (req, res) => {
  let key =
    config.removeBgKey[Math.floor(Math.random() * config.removeBgKey.length)];
  const url = req.query.url;
  const outputFile = __dirname + `/../../temp/removebg.png`;

  removeBackgroundFromImageUrl({
    url,
    apiKey: key,
    size: 'regular',
    type: 'person',
    outputFile,
  })
    .then(async (result) => {
      await imgbbFile(outputFile)
        .then(async (result) => {
          res.send(data(result));
          await sleep(2000);
          fs.unlinkSync(outputFile);
        })
        .catch((err) => {
          res.send(fail(err.message));
        });
    })
    .catch((errors) => {
      console.log(JSON.stringify(errors));
    });
};
