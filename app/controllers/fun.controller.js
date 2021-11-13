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

exports.simi = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());
  const q = req.query.q;
  if (q) {
    await axios
      .get(`https://api.simsimi.net/v2/?text=${q}&lc=id&cf=false`)
      .then((result) => {
        // console.log(result.data);
        res.send(data(result.data.success));
      })
      .catch((err) => {
        res.status(406).send(fail(err.message));
      });
  }
};
exports.animeQuotes = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());

  await axios
    .get(`https://api.rei.my.id/api/quotes`)
    .then((result) => {
      // console.log(result.data);
      res.send(data(result.data, 'Thanks to Eilaluth'));
    })
    .catch((err) => {
      res.status(406).send(fail(err.message));
    });
};

exports.trendsTwt = async (req, res) => {
  const cekApikey = await cekKey(req.query.apikey);
  if (!cekApikey) return res.send(invalidKey());
  const location = req.query.location;
  await axios
    .get(`https://api-twitter-trends.herokuapp.com/trends?location=${location}`)
    .then((result) => {
      res.send(data(result.data.data, 'Thanks to azharimm'));
    })
    .catch((err) => {
      res.send(data('error'));
    });
};

const request = require('request-promise');
const cheerio = require('cheerio');
var moment = require('moment');
exports.location = async (req, res) => {
  try {
    const htmlResult = await request.get(`https://twitter.com/home`);
    const $ = await cheerio.load(htmlResult);
    const locations = [];
    $('.suggested-locations__list')
      .children('li')
      .each((index, el) => {
        let location = $(el).text().replace(' ', '-');
        locations.push({
          location_path: location.toLocaleLowerCase(),
          location_url: '/trends?location=' + location.toLocaleLowerCase(),
        });
      });

    return res.send(data(locations));
  } catch (error) {
    return console.log(error);
  }
};
