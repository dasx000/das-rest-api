const { query } = require('express');
const { getApikey, getRole, findAllUser } = require('../../database/function');
const db = require('../models');
const Users = db.users;
const fs = require('fs');
const { sleep } = require('../../lib/tools');
exports.uploadPhoto = async (req, res) => {
  const imgbbUploader = require('imgbb-uploader');
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    req.flash('error_msg', 'No files were uploaded.');
    return res.redirect('/api/member/edit_profile');
  } else if (!req.files.sampleFile.mimetype.includes('image')) {
    req.flash('error_msg', 'must be type image');
    return res.redirect('/api/member/edit_profile');
  }
  // if(req.files.foo.mimetype)

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + '/' + sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
    if (err) {
      req.flash('error_msg', err.message);
      return res.redirect('/api/member/edit_profile');
    }

    imgbbUploader('579e940362fad0cdef0df6cc0958e2d8', uploadPath).then(
      (response) => {
        console.log(req.user.id);
        // Users.findByIdAndUpdate(req.user.id, { img: response.url });
        Users.findByIdAndUpdate(req.user.id, { img: response.url })
          .then((user) => {
            // console.log(user);
            req.flash('success_msg', 'Uploaded');
            res.redirect('/api/member/edit_profile');
          })
          .catch((err) => {
            req.flash('error_msg', err.message);
            res.redirect('/api/member/edit_profile');

            // req.flash('success_msg', 'Success upload image');
            // res.redirect('/api/member/edit_profile');
          });
        // console.log(response.url);
      }
    );
    // .catch((error) => console.error(error));
  });

  await sleep(5000);
  fs.unlinkSync(uploadPath);
};

exports.saveProfile = async (req, res) => {
  console.log(req.body.apikey);
  const id = req.user.id;
  const userName = req.body.userName;
  req.body.userName = userName.toLowerCase();
  req.body.apikey = req.body.apikey.replace(' ', '');

  await Users.findByIdAndUpdate(id, req.body)
    .then((result) => {
      req.flash('success_msg', 'Success update data');
      res.redirect('/api/member/edit_profile');
    })
    .catch((err) => {
      req.flash('error_msg', 'Error While Update Data');
      console.log(err.message);
      res.redirect('/api/member/edit_profile');
    });
};

exports.editProfile = async (req, res) => {
  try {
    res.render('user/edit', {
      title: 'Edit Profile',
      user: req.user,
      users: await findAllUser(),
      layout: 'layouts/main',
    });
  } catch (err) {
    console.log(err);
    res.redirect('/api');
  }
};
