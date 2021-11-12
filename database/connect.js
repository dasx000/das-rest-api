const db = require('../app/models/');
const url = db.url2 || db.url;

const connectMongoDb = () => {
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
};

module.exports = connectMongoDb;
