const db = require('../models');
const Articles = db.articles;
const { data, fail } = require('../../message');
const bcrypt = require('bcrypt');
const {
  color,
  uploader,
  isUrl,
  createSerial,
  sleep,
} = require('../../lib/tools');
const imgbbUploader = require('imgbb-uploader');
const fs = require('fs');

// mengexport function

exports.blog = async (req, res) => {
  try {
    const dataz = await Articles.find();
    console.log(dataz);
    res.render('blog/index', {
      layout: 'blog/layouts/main',
      article: dataz,
    });
  } catch (err) {
    console.log(err.message);
  }
};
exports.create = (req, res) => {
  try {
    res.render('blog/writepanel', {
      layout: 'blog/layouts/main',
    });
  } catch (err) {
    console.log(err.message);
    // res.status(500).send(fail(500, 'Some Error While Retrieving user!'));
  }
};

exports.store = async (req, res) => {
  console.log(req.body.category);
  let img;
  let uploadPath;
  if (!req.files || Object.keys(req.files).length === 0) {
    req.flash('error_msg', 'No files were uploaded');
    res.redirect('/blog/create');
  }

  // The name of the input field (i.e. "img") is used to retrieve the uploaded file
  img = req.files.img;
  uploadPath = __dirname + '/' + img.name;

  // Use the mv() method to place the file somewhere on your server
  img.mv(uploadPath, async function (err) {
    if (err) {
      req.flash('error_msg', err.message);
      res.redirect('/blog/create');
    }

    await imgbbUploader('579e940362fad0cdef0df6cc0958e2d8', uploadPath).then(
      async (response) => {
        const article = new Articles({
          title: req.body.title,
          content: req.body.content,
          // writer: req.user.id,
          img: response.url,
        });
        try {
          await article.save();

          res.redirect('/blog');
          req.flash('success_msg', 'Article Created Successfully');
        } catch (err) {
          console.log(err.message);
          res.render('blog/writepanel', {
            layout: 'blog/layouts/main',
          });
          req.flash('error_msg', 'Some Error While Creating Article');
          // res.status(500).send(fail(500, 'Some Error While Retrieving user!'));
        }
        return response.url;
      }
    );
    // .catch((error) => console.error(error));
  });

  await sleep(1000);
  fs.unlinkSync(uploadPath);
};
