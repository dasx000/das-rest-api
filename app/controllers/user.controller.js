const db = require('../models');
const Users = db.users;
const { data, fail } = require('../../message');
const bcrypt = require('bcrypt');
const { color, processTime, isUrl, createSerial } = require('../../lib/tools');

// mengexport function
exports.register = (req, res) => {
  console.log(req.body.userName);
  new Promise((resolve, reject) => {
    Users.findOne({ userName: req.body.userName })
      .then((user) => {
        if (user) {
          reject(res.send(fail(false, 'User already registered')));
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              reject(res.send(fail(false, 'Error while hashing password')));
            } else {
              req.body.password = hash;
              req.body.apikey = createSerial(20);
              Users.create(req.body)
                .then((result) =>
                  resolve(
                    res.send(data(result, 'User registered successfully'))
                  )
                )
                .catch((err) => reject(res.send(fail(false, err.message))));
            }
          });
        }
      })
      .catch((err) => {
        reject(res.send(fail(false, err.message)));
      });
  });
};

exports.login = (req, res) => {
  new Promise((resolve, reject) => {
    Users.findOne({ userName: req.body.userName })
      .then((user) => {
        if (user) {
          bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
              reject(res.send(fail(false, 'Error while comparing password')));
            } else if (result) {
              resolve(res.send(data(user, 'Login success')));
            } else {
              reject(res.send(fail(false, 'Incorrect password')));
            }
          });
        } else {
          reject(res.send(fail(false, 'User not registered')));
        }
      })
      .catch((err) => {
        reject(res.send(fail(false, err.message)));
      });
  });
};
