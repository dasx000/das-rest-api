const { check, validationResult, body } = require('express-validator');

module.exports = {
  // is valid register
  isValid: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('error_msg', errors.array()[0].msg);
      return res.redirect('/auth/register');
    }
    next();
  },

  // is valid edit profile
  isValidEdit: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('error_msg', errors.array()[0].msg);
      return res.redirect('/docs/member/edit_profile');
    }
    next();
  },

  // validate register
  validateRegister: [
    check('password')
      .isLength({ min: 3 })
      .withMessage('Password must be at least 3 chars long')
      .isLength({ max: 50 })
      .withMessage('Password must be less than 50 chars long'),
    check('email').isEmail().withMessage('Email is invalid'),
  ],

  // validate edit profile
  validateEditProfile: [
    check('email').isEmail().withMessage('Email is invalid'),
    check('email')
      .isEmail()
      .withMessage('Email is invalid')
      .isLength({ max: 50 })
      .withMessage('Email must be less than 50 chars long'),

    check('userName')
      .isLength({ max: 50 })
      .withMessage('Email must be less than 50 chars long'),

    check('fullName')
      .isLength({ max: 50 })
      .withMessage('Full Name must be less than 50 chars long'),

    check('apikey')
      .isLength({ max: 25 })
      .withMessage('Apikey must be less than 15 chars long'),
  ],
  validatePassword: [
    body('new_pw')
      .isLength({ min: 3 })
      .withMessage('Password must be at least 3 chars long')
      .isLength({ max: 50 })
      .withMessage('Password must be less than 50 chars long'),
  ],
  // is valid edit profile
  isValidPassword: (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      req.flash('error_msg', errors.array()[0].msg);
      return res.redirect('/docs/member/change_password');
    }
    next();
  },
};
