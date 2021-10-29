const express = require('express');
const das = express();
const port = process.env.PORT || 8000;
// const port = 8000;

das.use(express.json());
das.use(express.urlencoded({ extended: true }));

// connect to database
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

// menghubungkan router students
require('./app/routes/student.route')(das);

// LISTEN

das.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});
