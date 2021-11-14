const dbConfig = require('../../config/db.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// membuat object db
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.url2 = dbConfig.url2;
db.students = require('./student.model')(mongoose);
db.users = require('./user.model')(mongoose);
db.articles = require('./article.model')(mongoose);
db.counters = require('./counter.model')(mongoose);
db.emails = require('./tempmail.model')(mongoose);

module.exports = db;
