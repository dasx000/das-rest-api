const { query } = require('express');
const { getApikey, getRole, findAllUser } = require('../../database/function');
const db = require('../models');
const Users = db.users;
const fs = require('fs');
const { sleep } = require('../../lib/tools');
const { getHashedPassword } = require('../../lib/function');

// =_=_=_=_=_=_=_=_=_=_=_=_ modules =_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_
exports.uploadPhoto = async (req, res) => {
  const imgbbUploader = require('imgbb-uploader');
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    req.flash('error_msg', 'No files were uploaded.');
    return res.redirect('/docs/member/edit_profile');
  } else if (!req.files.sampleFile.mimetype.includes('image')) {
    req.flash('error_msg', 'must be type image');
    return res.redirect('/docs/member/edit_profile');
  }
  // if(req.files.foo.mimetype)

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + '/' + sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
    if (err) {
      req.flash('error_msg', err.message);
      return res.redirect('/docs/member/edit_profile');
    }

    imgbbUploader('579e940362fad0cdef0df6cc0958e2d8', uploadPath).then(
      (response) => {
        console.log(req.user.id);
        // Users.findByIdAndUpdate(req.user.id, { img: response.url });
        Users.findByIdAndUpdate(req.user.id, { img: response.url })
          .then((user) => {
            // console.log(user);
            req.flash('success_msg', 'Uploaded');
            res.redirect('/docs/member/edit_profile');
          })
          .catch((err) => {
            req.flash('error_msg', err.message);
            res.redirect('/docs/member/edit_profile');

            // req.flash('success_msg', 'Success upload image');
            // res.redirect('/docs/member/edit_profile');
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
  if (req.user.role == 1 && req.user.role == 2) {
    req.body.apikey = req.body.apikey.replace(' ', '');
  }

  await Users.findByIdAndUpdate(id, req.body)
    .then((result) => {
      req.flash('success_msg', 'Success update data');
      res.redirect('/docs/member/edit_profile');
    })
    .catch((err) => {
      req.flash('error_msg', 'Error While Update Data');
      console.log(err.message);
      res.redirect('/docs/member/edit_profile');
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
    res.redirect('/docs');
  }
};

// =_=_=_=_=_=_=_=_=_=_=_=_ Change Password _=_=_==_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_
exports.changePassword = async (req, res) => {
  try {
    res.render('user/password', {
      title: 'Change Password',
      user: req.user,
      layout: 'layouts/main',
    });
  } catch (err) {
    console.log(err);
    res.redirect('/docs');
  }
};

exports.savePassword = async (req, res) => {
  const { id, current_pw, new_pw, confirm_pw } = req.body;
  // check password
  await Users.findById(id).then(async (user) => {
    if (user.password != getHashedPassword(current_pw)) {
      req.flash('error_msg', 'Current Password is wrong');
      res.redirect('/docs/member/change_password');
    } else if (new_pw != confirm_pw) {
      req.flash('error_msg', 'New Password and Confirm Password is not same');
      res.redirect('/docs/member/change_password');
    } else {
      await Users.findByIdAndUpdate(id, {
        password: getHashedPassword(new_pw),
      }).then((result) => {
        req.flash('success_msg', 'Success update password');
        res.redirect('/docs');
      });
    }
  });
};
