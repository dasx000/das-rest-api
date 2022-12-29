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
// OTENTIKASI USER
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
} = require('./database/function');
const authRouters = require('./app/routes/auth.route');
const session = require('express-session');
const expressVisitorCounter = require('express-visitor-counter');
const MemoryStore = require('memorystore')(session);
const compression = require('compression');
// END OTENTIKASI USER
// == OTENTIFIKASI USER ==
das.set('trust proxy', 1);
// connect to database mongodb
const dbConnection = connectMongoDb();
das.use(compression());
das.set('view engine', 'ejs');
das.use(expressLayout);
das.use(express.static('public'));
das.use(express.json());
das.use(express.urlencoded({ extended: true }));
das.use(cors());
///////////db ////////////
let form = JSON.parse(fs.readFileSync('form.json', 'utf-8'));
///////////////////
das.use(
  bodyParser.json({
    extended: true,
    limit: '50mb',
  })
);
das.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

das.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 864000000 },
    store: new MemoryStore({
      checkPeriod: 864000000,
    }),
  })
);

das.use(cookieParser());

das.use(passport.initialize());
das.use(passport.session());
require('./lib/config')(passport);

das.use(flash());
das.use(methodOverride('_method'));

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

// res.json({ message: 'haii :)' });
das.get('/', async function (req, res, next) {
  const visitor = await runVisitor();
  console.log(req.host);
  res.json(req.host);
});
// res.json({ message: 'haii :)' });
// das.get('/tes', async function (req, res) {
//   res.render('tes', {
//     title: 'TES',
//     layout: 'layouts/main',
//   });
// Storing the records from the Visitor table
// });

das.get('/p', (req, res) => {
  res.render('index', { layout: false });
});
das.get('/docs', async (req, res) => {
  const visitor = await runVisitor();
  let getUser = await findAllUser();
  res.render('dashboard', {
    title: 'Dashboard',
    user: req.user,
    utils: { visitor },
    users: getUser,
    layout: 'layouts/main',
  });
});

// request google form
das.get('/google_form1', async (req, res) => {
  const nama = req.query.nama;
  const npm = req.query.npm;
  const wa = req.query.wa;
  // if (!nama || !npm || !wa) return res.json({ message: 'data tidak lengkap' });
  form.push({ nama: nama, npm: npm, wa: wa });
  fs.writeFileSync('form.json', JSON.stringify(form));
});
das.get('/data_form1', async (req, res) => {
  res.json(form);
  // fs.writeFileSync('form.json', JSON.stringify(form));
});

// menghubungkan router
require('./app/routes/tool.route')(das);
require('./app/routes/student.route')(das);
require('./app/routes/islam.route')(das);
require('./app/routes/user.route')(das);
require('./app/routes/admin.route')(das);
require('./app/routes/member.route')(das);
require('./app/routes/blog.route')(das);
require('./app/routes/fun.route')(das);
require('./app/routes/information.route')(das);
das.use('/auth', authRouters);

// LISTEN

das.use((req, res, next) => {
  res.status(404).render('error-404', {
    layout: false,
  });
});

das.listen(port, () => {
  console.log(`Server started on PORT ${port}`);
});
