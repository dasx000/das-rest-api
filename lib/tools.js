const chalk = require('chalk');
const crypto = require('crypto');
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Jakarta').locale('id');
const imgbbUploader = require('imgbb-uploader');
const fs = require('fs');

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

module.exports = {
  sleep,
  color,
  createSerial,
  uploader,
  isUrl,
};
