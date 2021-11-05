const chalk = require('chalk');
const crypto = require('crypto');
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Jakarta').locale('id');

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

module.exports = {
  color,
  createSerial,
  isUrl,
};
