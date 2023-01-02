const port = 8000;
const fs = require('fs');
const ms = require('ms');
const { data, fail, invalidKey } = require('../../message');
const { scihub } = require('../../lib/scihub');
const axios = require('axios');
const { ytMp3, ytMp4, ytPlay } = require('../../lib/youtube');
const { TiktokDownloader } = require('./../../lib/tiktok');
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
const { gdrive } = require('../../lib/google');
const { instagram, fbVideo, mediafire } = require('../../lib/scrape');
let config = require('../../config/config');
const db = require('../models');
// =_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_

exports.googleDrive = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());
  const link = req.query.link;
  // Split the link into an array of parts
  const parts = link.split('/');
  // The file ID is the last part of the link
  const fileId = parts[5];
  console.log('p');
  console.log(fileId);
  gdrive(fileId)
    .then((result) => {
      console.log(result);
      let size = result[3] / 1000000;
      res.send(
        data({
          link: result[0],
          filename: result[1],
          mimetype: result[2],
          size: size.toFixed(2) + ' MB',
        })
      );
    })
    .catch((err) => {
      res.status(404).send(fail('File not found'));
    });
};

exports.tiktok = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());

  const url = req.query.url;
  if (!url) return res.send(fail('url tidak boleh kosong'));
  await TiktokDownloader(url)
    .then(async (result) => {
      // const result2 = await shortUrl(result.result);
      console.log(result);
      res.send(data(result));
    })
    .catch((err) => {
      res.send(fail(err.message));
    });
};

exports.instagram = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());

  const url = req.query.url;
  if (!url) return res.send(fail('url tidak boleh kosong'));
  await instagram(url)
    .then(async (result) => {
      // const result2 = await shortUrl(result.result);
      console.log(result);
      res.send(data(result));
    })
    .catch((err) => {
      res.send(fail(err));
    });
};

exports.fbVideo = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());

  const url = req.query.url;
  if (!url) return res.send(fail('url tidak boleh kosong'));
  await fbVideo(url)
    .then(async (result) => {
      // const result2 = await shortUrl(result.result);
      console.log(result);
      res.send(data(result));
    })
    .catch((err) => {
      res.send(fail(err));
    });
};

exports.mediafire = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());

  const url = req.query.url;
  if (!url) return res.send(fail('url tidak boleh kosong'));
  await mediafire(url)
    .then(async (result) => {
      // const result2 = await shortUrl(result.result);
      console.log(result);
      res.send(data(result));
    })
    .catch((err) => {
      res.send(fail(err));
    });
};
exports.sci = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());

  const url = req.query.url;
  if (!url) return res.send(fail('url tidak boleh kosong'));
  await scihub(url)
    .then(async (result) => {
      // const result2 = await shortUrl(result.result);
      console.log(result);
      res.send(data(result));
    })
    .catch((err) => {
      res.send(fail(err));
    });
};
