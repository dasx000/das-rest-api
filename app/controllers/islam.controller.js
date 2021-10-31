const { data, fail } = require('../../message');
const axios = require('axios');

exports.search_word = async (req, res) => {
  const q = req.query.q;

  await axios
    .get(`https://api.alquran.cloud/v1/search/${q}/all/id`)
    .then((result) => {
      res.send(data(result.data.data));
    })
    .catch((err) => {
      res.status(406).send(fail(406, `error`));
    });
};
