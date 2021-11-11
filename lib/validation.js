const { check, validationResult } = require('express-validator');

module.exports = {
  isValid: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('error_msg', errors.array()[0].msg);
      return res.redirect('/auth/register');
      //   return console.log('dahahs');
    }
    next();
  },
  isValidEdit: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('error_msg', errors.array()[0].msg);
      return res.redirect('/api/member/edit_profile');
      //   console.log('dahahs');
    }
    next();
  },

  validateRegister: [
    check('password')
      .isLength({ min: 4 })
      .withMessage('Password must be at least 4 chars long')
      .isLength({ max: 50 })
      .withMessage('Password must be less than 50 chars long'),
    check('email').isEmail().withMessage('Email is invalid'),
  ],
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

    check('apikey', 'API Key is required')
      .notEmpty()
      .isLength({ max: 25 })
      .withMessage('Apikey must be less than 15 chars long'),
  ],
};
