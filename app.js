const express = require('express');
const das = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const db = require('./app/models/');
const cors = require('cors');
das.use(express.json());
das.use(express.urlencoded({ extended: true }));
das.use(cors());
das.use(
  bodyParser.json({
    extended: true,
    limit: '50mb',
  })
);

das.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// connect to database mongodb

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: true,
  })
  .then((result) => {
    console.log('Success Connect To the Database');
  })
  .catch((err) => {
    console.log('Cannot Connect To the Database!', err);
    process.exit();
  });

das.get('/', (req, res) => {
  res.json({ message: 'haii, welcome' });
});

// menghubungkan router
require('./app/routes/tool.route')(das);
require('./app/routes/student.route')(das);
require('./app/routes/islam.route')(das);
require('./app/routes/user.route')(das);

// LISTEN

das.listen(port, () => {
  console.log(`Server started on PORT ${port}`);
});
