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
        res.status(406).send(fail(result));
      });
  }
};
