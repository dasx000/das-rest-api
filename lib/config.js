const LocalStrategy = require('passport-local').Strategy;
const { getHashedPassword } = require('./function');
const db = require('../app/models/');
const User = db.users;

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        // session: false,
      },
      (username, password, done) => {
        console.log(username);
        let hashed = getHashedPassword(password);
        User.findOne({ email: username }).then((users) => {
          if (!users)
            return done(null, false, {
              message: 'That email is not registered',
            });
          if (username === users.email && hashed === users.password) {
            return done(null, users);
          } else {
            return done(null, false, {
              message: 'Invalid email or password',
            });
          }
        });
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
