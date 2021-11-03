const dbConfig = require('../../config/db.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// membuat object db
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.students = require('./student.model')(mongoose);
db.users = require('./user.model')(mongoose);

module.exports = db;
