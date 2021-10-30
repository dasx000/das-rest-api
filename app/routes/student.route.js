module.exports = (das) => {
  const students = require('../controllers/student.controller');
  const router = require('express').Router();

  router.get('/', students.findAll);
  router.post('/', students.create);

  router.put('/:id', students.update);
  router.delete('/:id', students.delete);
  router.get('/search', students.search);
  router.get('/id/:id', students.findById);

  das.use('/api/students', router);
};
