// =_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_ START MODULES _=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_
const express = require('express');
const fs = require('fs');
const das = express();
const expressLayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const cors = require('cors');
const connectMongoDb = require('./database/connect');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');
const db = require('./app/models/');
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const { isAuthenticated } = require('./lib/auth');
const { sleep } = require('./lib/tools');
const {
  getApikey,
  getRole,
  findAllUser,
  runVisitor,
  runHits,
  hits,
} = require('./database/function');
const authRouters = require('./app/routes/auth.route');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const compression = require('compression');
// =_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_ END MODULES _=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_

const dbConnection = connectMongoDb(); //  connect to mongodb

das.set('trust proxy', 1);

das.use(compression()); // middleware untuk kompresi data
das.set('view engine', 'ejs'); // middleware untuk menerapkan view engine ejs

das.use(expressLayout);
das.use(express.static('public'));
//das.use(express.json()); // mengambil request type json kemudian mengubah menjadi object
//das.use(express.urlencoded({ extended: true })); // mengambil request type application/x-www-form-urlencoded kemudian mengubah menjadi object
das.use(cors()); // mengizinkan app lain untuk mengakses sumber daya
///////////db ////////////
let form = JSON.parse(fs.readFileSync('form.json', 'utf-8'));
///////////////////
das.use(
  bodyParser.json({
    // mengambil request type json kemudian mengubah menjadi object
    extended: true,
    limit: '50mb',
  })
);
das.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // mengambil request type application/x-www-form-urlencoded kemudian mengubah menjadi object

das.use(
  session({
    secret: 'secret', //menunjukkan string rahasia yang digunakan untuk mengenkripsi sesi pengguna.
    resave: true, //menunjukkan bahwa sesi pengguna harus disimpan kembali ke penyimpanan sesi setiap kali ada perubahan, meskipun tidak ada perubahan data sesi.
    saveUninitialized: true,
    cookie: { maxAge: 864000000 }, // waktu expired cookie
    store: new MemoryStore({
      checkPeriod: 864000000,
    }),
  })
);

das.use(cookieParser()); //Middleware cookie-parser adalah sebuah komponen yang akan memproses cookie yang dikirimkan dalam permintaan ke server.

das.use(passport.initialize()); //P assport adalah sebuah pustaka yang memudahkan pengelolaan otentikasi pengguna dalam aplikasi web dengan menyediakan sekumpulan strategi otentikasi yang dapat digunakan. Salah satu strategi yang paling populer adalah otentikasi menggunakan login dan password. Namun, Passport juga menyediakan strategi otentikasi lainnya seperti otentikasi menggunakan layanan seperti Facebook, Google, atau Twitter.
das.use(passport.session()); //Middleware passport.session() akan mengelola sesi otentikasi pengguna dalam aplikasi web. Setelah pengguna terotentikasi, informasi otentikasi pengguna akan disimpan dalam sesi dan akan tersedia untuk seluruh permintaan selama sesi tersebut masih aktif
require('./lib/config')(passport); // mengirimkan argument passport ke file config.js

das.use(flash()); // Middleware flash adalah sebuah komponen yang akan memungkinkan Anda untuk menyimpan pesan sementara dalam aplikasi web
das.use(methodOverride('_method')); //Middleware method-override adalah sebuah komponen yang akan memungkinkan Anda untuk mengubah metode HTTP yang digunakan dalam permintaan ke server.

das.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});
das.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
  })
);
// =_=_=_=_=_=_=_=_=_=_=_=_ HITS COUNTER _=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_
das.use(async (req, res, next) => {
  await runHits();
  next();
});

das.get('/', async function (req, res, next) {
  const visitor = await runVisitor();
  console.log(req.hostname);
  res.render('index', { layout: false });
  console.log(res.locals);
});

das.get('/docs', async (req, res) => {
  const visitor = await runVisitor();
  const hit = await hits();
  console.log(hit);
  let getUser = await findAllUser();
  res.render('dashboard', {
    title: 'Dashboard',
    user: req.user,
    utils: { visitor, hit },
    users: getUser,
    layout: 'layouts/main',
  });
});

// =_=_=_=_=_=_=_=_=_=_=_=_ ROUTER _=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_
require('./app/routes/tool.route')(das);
require('./app/routes/student.route')(das);
require('./app/routes/islam.route')(das);
require('./app/routes/user.route')(das);
require('./app/routes/admin.route')(das);
require('./app/routes/member.route')(das);
require('./app/routes/blog.route')(das);
require('./app/routes/fun.route')(das);
require('./app/routes/information.route')(das);
require('./app/routes/downloader.route')(das);
das.use('/auth', authRouters);

// =_=_=_=_=_=_=_=_=_=_=_=_ 404 _=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_
das.use((req, res, next) => {
  res.status(404).render('error-404', {
    layout: false,
  });
});

// =_=_=_=_=_=_=_=_=_=_=_=_ RUNNING _=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_
das.listen(port, () => {
  console.log(`Server started on PORT ${port}`);
});
