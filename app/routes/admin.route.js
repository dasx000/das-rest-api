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

module.exports = (das) => {
  router.put('/save_edit_user', admin.saveEditUser);
  router.get('/list_user', admin.list_user);
  router.delete('/list_user/delete', admin.deleteUser);
  router.get('/list_students', admin.listStudents);
  router.post('/edit_user', admin.editUser);

  das.use('/docs/admin', isAuthenticated, router);
};
