module.exports = (das) => {
  const { getHashedPassword, randomText } = require('../../lib/function');
  const { checkEmail, addUser } = require('../../database/function');
  const {
    notAuthenticated,
    captchaLogin,
    captchaRegister,
  } = require('../../lib/auth');
  const { isAuthenticated } = require('../../lib/auth');

  const admin = require('../controllers/admin.controller');
  const router = require('express').Router();

  router.get('/list_user', admin.list_user);
  router.delete('/list_user/delete', admin.deleteUser);
  router.put('/save_profile', admin.saveProfile);
  router.put('/save_edit_user', admin.saveEditUser);
  router.get('/edit_profile', admin.edit);
  router.post('/edit_user', admin.editUser);

  das.use('/api/admin', isAuthenticated, router);
};
