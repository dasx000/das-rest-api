const {
  isValidEdit,
  validateEditProfile,
  isValid,
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

  das.use('/api/member', isAuthenticated, router);
};
