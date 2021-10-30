const { data, fail } = require('../../message');
const { scihub } = require('../../lib/scihub');

exports.sci = async (req, res) => {
  const link = req.query.doi;
  const result = await scihub(link);

  if (result.includes('http')) {
    res.send(data(result));
  } else {
    res.status(406).send(fail(406, result));
  }
};
