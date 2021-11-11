const express = require('express');
const router = express.Router();
const passport = require('passport');
const { recaptcha_key_1, recaptcha_key_2 } = require('../../lib/settings');
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const recaptcha = new Recaptcha(recaptcha_key_1, recaptcha_key_2);
const { getHashedPassword, randomText } = require('../../lib/function');
const {
  isValid,
  validateRegister,
  validateEditProfile,
  isValidEdit,
} = require('../../lib/validation');
const { checkEmail, addUser } = require('../../database/function');
const {
  notAuthenticated,
  captchaLogin,
  captchaRegister,
} = require('../../lib/auth');
router.get('/', notAuthenticated, (req, res) => {
  res.render('login', { layout: false });
});

router.get(
  '/login',
  notAuthenticated,
  recaptcha.middleware.render,
  (req, res) => {
    res.render('login', {
      recaptcha: res.recaptcha,
      layout: false,
    });
  }
);

router.post(
  '/login',
  recaptcha.middleware.verify,
  captchaLogin,
  async (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/api',
      failureRedirect: '/auth/login',
      failureFlash: true,
    })(req, res, next);
  }
);

router.get(
  '/register',
  notAuthenticated,
  recaptcha.middleware.render,
  (req, res) => {
    res.render('register', { layout: false, recaptcha: res.recaptcha });
  }
);

router.post(
  '/register',
  validateRegister,
  isValidEdit,
  recaptcha.middleware.verify,
  captchaRegister,
  async (req, res) => {
    try {
      let { password, confirmPassword, email } = req.body;
      // if (password.length < 4 || confirmPassword < 4) {
      //   req.flash('error_msg', 'Password must be at least 6 characters');
      //   return res.redirect('/auth/register');
      // }
      if (password === confirmPassword) {
        let checking = await checkEmail(email);
        if (checking) {
          req.flash('error_msg', 'A user with the same email already exists');
          return res.redirect('/auth/register');
        } else {
          let role = 3;
          let hashedPassword = getHashedPassword(password);
          let apikey = randomText(10);
          addUser(email, hashedPassword, role, apikey);
          // addUser(email, fullName, email, hashedPassword, role, apikey);
          req.flash('success_msg', 'You are now registered and can login');
          return res.redirect('/auth/login');
        }
      } else {
        req.flash('error_msg', 'Password does not match.');
        return res.redirect('/auth/register');
      }
    } catch (err) {
      console.log(err);
    }
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'logout success');
  res.redirect('/auth/login');
});

module.exports = router;
