module.exports = (das) => {
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

  // router.get('/upload_photo', member.edit);
  router.post('/upload_photo', member.uploadPhoto);

  das.use('/api/member', isAuthenticated, router);
};
