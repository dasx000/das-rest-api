const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');

// SCHI-HUB
const scihub = async function (par) {
  // http://localhost:8000/api/tools/scihub?doi=https://doi.org/10.1016/j.cropro.2015.05.012
  const res = await axios.get(`https://sci-hub.se/${par}`);

  const html = await res.data;
  const $ = cheerio.load(html);
  let sci = '';
  sci = $('#buttons button').attr('onclick');

  if (sci == undefined) {
    return `This link cannot be downloaded`;
  } else {
    var babi = sci.replace("location.href='//", "'");
    var xxx = babi.replace("'", '');
    var sciResult = 'https://' + xxx;
    var sciResult1 = sciResult.split('href=')[1];
    var sciRes2 = sciResult1.split('?download')[0];
    return sciRes2;
  }
  // });
};

module.exports = { scihub };
