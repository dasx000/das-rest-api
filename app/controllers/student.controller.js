const db = require('../models/');
const Student = db.students;

// message
const data = (res, mess = `Success`) => {
  const result = {
    Owner: 'DASX000',
    status: 200,
    message: mess,
    result: res,
  };
  return result;
};

const fail = (status, mess = '') => {
  const fail = {
    Owner: 'DASX000',
    status: status,
    message: mess,
  };
  return fail;
};
// mengexport function
exports.findAll = (req, res) => {
  Student.find()
    .then((result) => {
      res.send(data(result));
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send(fail(500, 'Some Error While Retrieving Students!'));
    });
};

exports.create = (req, res) => {
  const student = new Student({
    no: req.body.no,
    nama: req.body.nama,
    npm: req.body.npm,
    prodi: req.body.prodi ? req.body.prodi : 'S1-Agronomi',
    Tahun_masuk: req.body.Tahun_masuk,
    status: req.body.status,
    semester: req.body.semester,
    ipk: req.body.ipk,
    sks_lulus: req.body.sks_lulus,
  });

  student
    .save(student)
    .then((result) => {
      res.send(data(result));
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send(fail(500, 'Some Error While Create Students!'));
    });
};

exports.findById = (req, res) => {
  const id = req.params.id;
  Student.findById(id)
    .then((result) => {
      if (result == null) {
        res.status(404).send(fail(404, 'Not Found!'));
      }
      res.send(data(result));
    })
    .catch((err) => {
      console.log(err.message);
      res.status(409).send(fail(409, 'Some Error While Find Student!'));
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Student.findByIdAndUpdate(id, req.body)
    .then((result) => {
      res.send(data(result));
    })
    .catch((err) => {
      console.log(err.message);
      res.status(409).send(fail(500, 'Some Error While Update Student!'));
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Student.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send(fail(404, `Not Found`));
      }

      res.send({ message: `Success Delete Data` });
    })
    .catch((err) => {
      res.status(409).send(fail(409, 'Some Error While Delete Student!'));
      console.log(err.message);
    });
};

exports.search = (req, res) => {
  const apikeyInput = req.query.apikey;
  if (!apikeyInput)
    return res.status(403).send(fail(403, 'please enter the apikey!'));
  if (apikeyInput != 'diky')
    return res.status(406).send(fail(406, 'Apikey Invalid!'));

  const nama = req.query.q;
  Student.find({ nama: `${nama.toUpperCase()}` })
    .then((result) => {
      if (result == '') {
        Student.find({ npm: `${nama}` })
          .then((result) => {
            if (result == '') {
              res.status(404).send(fail(404, 'Not Found!'));
            } else {
              res.send(data(result));
            }
          })
          .catch((err) => {
            res.status(500).send(fail(500, 'Some Error While find Students!'));
          });
      } else {
        res.send(data(result));
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send(fail(500, 'Some Error While find Students!'));
    });
};
