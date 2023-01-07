const {
  isValidEdit,
  validateEditProfile,
  isValid,
  isValidPassword,
  validatePassword,
} = require('../../lib/validation');
const {
  notAuthenticated,
  captchaLogin,
  captchaRegister,
  isAuthenticated,
} = require('../../lib/auth');

const member = require('../controllers/member.controller');
const router = require('express').Router();

module.exports = (das) => {
  router.put(
    '/edit_profile',
    validateEditProfile,
    isValidEdit,
    member.saveProfile
  );
  router.get('/edit_profile', member.editProfile);
  router.post('/upload_photo', member.uploadPhoto);
  router.get('/change_password', member.changePassword);
  router.put(
    '/change_password',
    validatePassword,
    isValidPassword,
    member.savePassword
  );

  das.use('/docs/member', isAuthenticated, router);
};
