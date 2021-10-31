const express = require('express');
const das = express();
const port = process.env.PORT || 8000;
// const port = 8000;

das.use(express.json());
das.use(express.urlencoded({ extended: true }));

// connect to database mongodb
const db = require('./app/models/');
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
  res.json({ message: `Welcome To My Rest Api` });
});

// menghubungkan router
require('./app/routes/tool.route')(das);
require('./app/routes/student.route')(das);
require('./app/routes/islam.route')(das);

// LISTEN

das.listen(port, () => {
  console.log(`Server started on PORT ${port}`);
});
