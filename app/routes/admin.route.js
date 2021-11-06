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

  const admin = require('../controllers/admin.controller');
  const router = require('express').Router();

  router.get('/list_user', admin.list_user);
  router.delete('/list_user/delete', admin.deleteUser);
  router.put(
    '/save_profile',
    validateEditProfile,
    isValidEdit,
    admin.saveProfile
  );
  router.put('/save_edit_user', admin.saveEditUser);
  router.get('/edit_profile', admin.edit);
  router.post('/edit_user', admin.editUser);

  das.use('/api/admin', isAuthenticated, router);
};
