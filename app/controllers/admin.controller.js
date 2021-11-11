const { query } = require('express');
const {
  getApikey,
  getRole,
  findAllUser,
  visitors,
} = require('../../database/function');
const db = require('../models/');
const Users = db.users;

// mengexport function
exports.list_user = async (req, res) => {
  try {
    res.render('admin/users', {
      user: req.user,
      title: 'List User',
      utils: { visitor: await visitors() },
      users: await findAllUser(),
      layout: 'layouts/main',
    });
  } catch (err) {
    console.log(err);
    res.redirect('/api');
  }
};

exports.deleteUser = (req, res) => {
  console.log(req.body.id);
  Users.findByIdAndRemove(req.body.id)
    .then((result) => {
      console.log(result);
      req.flash('success_msg', 'Success Delete Data');
      res.redirect('/api/admin/list_user');
    })
    .catch((err) => {
      req.flash('error_msg', 'Error While Delete Data');
      console.log(err.message);
      res.redirect('/api/admin/list_user');
    });
};

///

// controller edit user
exports.editUser = async (req, res) => {
  const user = await Users.findById(req.body.id);

  try {
    res.render('admin/edit_user', {
      user: req.user,
      userTarget: user,
      title: 'Edit User',
      users: await findAllUser(),
      layout: 'layouts/main',
    });
  } catch (err) {
    console.log(err);
    res.redirect('/api');
    req.flash('error_msg', 'failed request');
  }
};

exports.saveEditUser = (req, res) => {
  const id = req.body.id;
  Users.findByIdAndUpdate(id, req.body)
    .then((result) => {
      // console.log(req.body.id);
      req.flash('success_msg', 'Success update data');
      res.redirect('/api/admin/list_user');
    })
    .catch((err) => {
      req.flash('error_msg', 'Error While Update Data');
      console.log(err.message);
      res.redirect('/api/admin/list_user');
    });
};
exports.listStudents = async (req, res) => {
  try {
    res.render('admin/students', {
      user: req.user,
      title: 'List Students',
      utils: { visitor: await visitors() },
      users: await findAllUser(),
      layout: 'layouts/main',
    });
  } catch (err) {
    console.log(err);
    res.redirect('/api');
  }
};
