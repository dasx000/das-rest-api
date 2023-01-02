const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');

// SCHI-HUB
const scihub = async function (par) {
  return new Promise(async (resolve, reject) => {
    // http://localhost:8000/api/tools/scihub?doi=https://doi.org/10.1016/j.cropro.2015.05.012
    const res = await axios.get(`https://sci-hub.se/${par}`);

    const html = await res.data;
    const $ = cheerio.load(html);
    let sci = '';
    sci = $('#buttons button').attr('onclick');

    if (sci == undefined) {
      reject(`This link cannot be downloaded`);
    } else {
      var babi = sci.replace("location.href='", 'https:');

      resolve(babi);
    }
    // });
  });
};

// scihub('https://doi.org/10.1016/S0925-5214(01)00163-6')
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
module.exports = { scihub };
