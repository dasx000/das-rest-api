const { data, fail } = require('../../message');
const { scihub } = require('../../lib/scihub');
const axios = require('axios');
const { ytMp3, ytMp4, ytPlay } = require('../../lib/youtube');

exports.sci = async (req, res) => {
  const link = req.query.doi;
  const result = await scihub(link);

  if (result.includes('http')) {
    res.send(data(result));
  } else {
    res.status(406).send(fail(406, result));
  }
};

exports.short_url = async (req, res) => {
  const url = req.query.url;
  await axios
    .get(`https://tinyurl.com/api-create.php?url=${url}`)
    .then((result) => {
      res.send(data(result.data));
    })
    .catch((err) => {
      // res.status(406).send(fail(406, err));
      res.status(406).send(fail(406, `Error`));
    });
};

exports.ytMP3 = async (req, res) => {
  const url = req.query.link;
  await ytMp3(url)
    .then((results) => {
      const {
        title,
        result,
        size,
        thumb,
        views,
        likes,
        dislike,
        channel,
        uploadDate,
        desc,
      } = results;
      res.send(
        data(
          {
            title,
            result,
            size,
            thumb,
            views,
            likes,
            dislike,
            channel,
            uploadDate,
            desc,
          },
          'Succes. Module by Zekais'
        )
      );
    })
    .catch((err) => {
      res.status(406).send(fail(406, 'error'));
    });
};
exports.ytMP4 = async (req, res) => {
  const url = req.query.link;
  await ytMp4(url)
    .then((results) => {
      const {
        title,
        result,
        quality,
        size,
        thumb,
        views,
        likes,
        dislike,
        channel,
        uploadDate,
        desc,
      } = results;
      res.send(
        data(
          {
            title,
            result,
            quality,
            size,
            thumb,
            views,
            likes,
            dislike,
            channel,
            uploadDate,
            desc,
          },
          'Succes. Module by Zekais'
        )
      );
    })
    .catch((err) => {
      res.status(406).send(fail(406, 'error'));
    });
};

exports.ytPLAY = async (req, res) => {
  const q = req.query.q;
  await ytPlay(q)
    .then((result) => {
      res.send(data(result, 'Succes. Module by Zekais'));
    })
    .catch((err) => {
      res.status(406).send(fail(406, 'error'));
    });
};
