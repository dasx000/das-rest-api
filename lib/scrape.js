const axios = require('axios');
const cheerio = require('cheerio');
const qs = require('qs');
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
} = require('./tools');
const instagram = async (url) => {
  return new Promise(async (resolve, reject) => {
    axios
      .request({
        url: 'https://snapinsta.io/id1',
        method: 'GET',
        headers: {
          cookie: `_csrf=50f51c1350b4cc8a01a9c9910415c921258541aa5dba06e35b86aab6a61be58da:2:{i:0;s:5:"_csrf";i:1;s:32:"FvPaYK0XtWe91sDkMA_4npvz5L5JJ2_S";}; _ga=GA1.1.1378472613.1672507793; _ga_V3DS4P6657=GS1.1.1672507792.1.1.1672508008.0.0.0; _ga_C685S7JGC5=GS1.1.1672507792.1.1.1672508008.0.0.0; amp_adc4c4=LVEBXZtNaqZWB4CyI1qGd-...1glkjn91m.1glkjtru5.0.0.0`,
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36',
        },
      })
      .then(({ data }) => {
        // const $ = cheerio.load(data);
        // const token = $('#token').attr('value');
        let config = {
          headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'sec-ch-ua':
              '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
            cookie: `.AspNetCore.Antiforgery.r2-pjF2WmeM=CfDJ8C9eoDh5PgZFlnjyICznTidGc5XAYctJ0wVqp_vJZ6n9sjWK7_9d0AJXlKXcrKDNzxf7E_-urEnFaQNBcmzihQy4gjyILHgzj97uVRlO3ppzyDeSFqReIikr9EDgP4EGhoHWP2nxZGUGzbMx8L9ckF4; amp_adc4c4=HKyvXJAEHWUybmdI4q02gL...1glkljata.1glklocp2.0.0.0; __atuvc=6|1; __atuvs=63b0794282200c4e005`,
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36',
          },
          data: {
            q: url,
            vt: 'facebook',
          },
        };
        axios
          .post(
            'https://snapinsta.io/api/ajaxSearch/instagram',
            qs.stringify(config.data),
            { headers: config.headers }
          )
          .then(({ data }) => {
            const $ = cheerio.load(String(data.data));
            const liLength = $('ul.download-box > li').length;
            console.log(liLength);
            const link = [];
            const li = $('ul.download-box > li').map((i, e) => {
              link.push($(e).find('a').attr('href'));
            });
            if (link.length === 0) reject('Not Found');
            resolve({ length: link.length, link: link });
          });
      })
      .catch(reject);
  });
};

module.exports = { instagram };
