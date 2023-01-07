// const { limitCount } = require('../lib/settings');
const db = require('../app/models/');
const Users = db.users;
const Counters = db.counters;
const photoDefault = 'https://i.ibb.co/bms8TZT/f9a09806a199.png';

async function addUser(email, password, role, apikey, img = photoDefault) {
  let obj = {
    email,
    password,
    role,
    apikey,
    img,
  };
  Users.create(obj);
}
// module.exports.addUser = addUser;

async function checkEmail(email) {
  let users = await Users.findOne({ email: email });
  if (users !== null) {
    return users.email;
  } else {
    return false;
  }
}
// module.exports.checkEmail = checkEmail;

async function getApikey(id) {
  let users = await Users.findOne({ _id: id });
  return users.apikey;
}
// module.exports.getApikey = getApikey;

async function getRole(id) {
  let users = await Users.findOne({ _id: id });
  return { role: users.role, apikey: users.apikey };
}
// module.exports.getRole = getRole;

async function cekKey(apikey) {
  let db = await Users.findOne({ apikey: apikey });
  if (db === null) {
    return false;
  } else {
    return db.apikey;
  }
}
async function isPremium(apikey) {
  let db = await Users.findOne({ apikey: apikey });
  // console.log(db);
  if (db === null) {
    return 'apikey tidak valid. Harap login untuk mendapatkan apikey';
  } else if (db.role != 1 && db.role != 2) {
    return 'khusus user premium. Hubungi owner untuk uji coba gratis!';
  } else {
    return true;
  }
}
// module.exports.cekKey = cekKey;

async function visitors() {
  let result = await Counters.findOne({ name: 'visitors' });
  if (result === null) {
    return 0;
  } else {
    return result.count;
  }
}
async function findAllUser() {
  let result = await Users.find();
  if (result === null) {
    return false;
  } else {
    return result;
  }
}
// module.exports.findAllUser = findAllUser;

// function run visitor
const runVisitor = async () => {
  let visitors = await Counters.findOne({ name: 'visitors' });

  // If the app is being visited first
  // time, so no records
  if (visitors == null) {
    // Creating a new default record
    const beginCount = new Counters({
      name: 'visitors',
      count: 1,
    });

    // Saving in the database
    beginCount.save();

    // Logging when the app is visited first time
    console.log('First visitor arrived');

    // Sending thee count of visitor to the browser
    return 1;
  } else {
    // Incrementing the count of visitor by 1
    visitors.count += 1;

    // Saving to the database
    visitors.save();

    // Sending thee count of visitor to the browser
    return visitors.count;
  }
};

// module run hits counter
const runHits = async () => {
  let hits = await Counters.findOne({ name: 'hits' });
  if (hits == null) {
    const beginHit = new Counters({
      name: 'hits',
      count: 1,
    });

    // save begin hit to database
    beginHit.save();

    return 1;
  }

  hits.count += 1;
  hits.save();
  return hits.count;
};

// module hits total
const hits = async () => {
  let result = await Counters.findOne({ name: 'hits' });
  if (result === null) {
    return 0;
  } else {
    return result.count;
  }
};
// cekexpiredemail
const checkExpiredEmail = async (collection) => {
  setInterval(async () => {
    await collection
      .find()
      .then((result) => {
        if (result.length > 0) {
          result.forEach(async (i) => {
            let date = Date.now();
            let expired = i.expired;
            if (expired < date) {
              console.log('success delete email');
              await collection.findByIdAndDelete(i._id);
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, 1000);
};

module.exports = {
  checkExpiredEmail,
  findAllUser,
  cekKey,
  addUser,
  visitors,
  runVisitor,
  getRole,
  checkEmail,
  getApikey,
  isPremium,
  runHits,
  hits,
};
