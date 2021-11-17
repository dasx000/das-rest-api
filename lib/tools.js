const chalk = require('chalk');
const crypto = require('crypto');
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Jakarta').locale('id');
const imgbbUploader = require('imgbb-uploader');
const fs = require('fs');
const axios = require('axios');
const translateF = require('@vitalets/google-translate-api');
const imgbbKey = '579e940362fad0cdef0df6cc0958e2d8';

/**
 * Get text with color.
 * @param {String} text
 * @param {String} color
 */
const color = (text, color) => {
  return !color ? chalk.green(text) : chalk.keyword(color)(text);
};

/**
 * Create serial ID.
 * @param {Number} size
 * @returns {String}
 */
const createSerial = (size) => {
  return crypto.randomBytes(size).toString('hex').slice(0, size);
};

/**
 * URL validator.
 * @param {String} url
 * @returns {Boolean}
 */
const isUrl = (url) => {
  return url.match(
    new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi
    )
  );
};

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const uploader = async (req, res) => {
  // console.log(req.files);
  let resultImg = '';
  let img;
  let uploadPath;
  if (!req.files || Object.keys(req.files).length === 0) {
    return 'No files were uploaded.';
  }

  // The name of the input field (i.e. "img") is used to retrieve the uploaded file
  img = req.files.img;
  uploadPath = __dirname + '/' + img.name;

  // Use the mv() method to place the file somewhere on your server
  img.mv(uploadPath, async function (err) {
    if (err) {
      return err.message;
      //  res.redirect('/api/member/edit_profile');
    }

    await imgbbUploader('579e940362fad0cdef0df6cc0958e2d8', uploadPath).then(
      (response) => {
        // console.log(response.url);
        return response.url;
      }
    );
    // .catch((error) => console.error(error));
  });

  await sleep(1000);
  fs.unlinkSync(uploadPath);
};

// function imggbb
const imgbb = async (url) => {
  return await axios
    .get(
      `https://api.imgbb.com/1/upload?key=a5a2983982815d6bb5afc6e782f40fd3&image=${url}&expiration=600`
    )
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return err;
    });
};

const shortUrl = async (url) => {
  return await axios
    .get(`https://tinyurl.com/api-create.php?url=${url}`)
    .then((result) => {
      console.log(result.data);
      return result.data;
    })
    .catch((err) => {
      return err;
    });
};
const translate = (text, lang) =>
  new Promise((resolve, reject) => {
    console.log(`Translating to ${lang}...`);
    translateF(text, { client: 'gtx', to: lang })
      .then((res) => resolve(res.text))
      .catch((err) => reject(err));
  });

//const imgbbUploader = require("imgbb-uploader");
const imgbbFile = async (path) => {
  const options = {
    apiKey: imgbbKey, // MANDATORY

    imagePath: path, // OPTIONAL: pass a local file (max 32Mb)

    name: 'dasx000_removebg_', // OPTIONAL: pass a custom filename to imgBB API

    expiration: 3600 /* OPTIONAL: pass a numeric value in seconds.
  It must be in the 60-15552000 range (POSIX time ftw).
  Enable this to force your image to be deleted after that time. */,
  };

  return await imgbbUploader(options)
    .then((response) => {
      return response.url;
    })
    .catch((error) => {
      return error;
    });
};
module.exports = {
  translate,
  imgbbFile,
  sleep,
  color,
  createSerial,
  shortUrl,
  uploader,
  isUrl,
  imgbb,
};
