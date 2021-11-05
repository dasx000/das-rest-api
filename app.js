const express = require('express');
const das = express();
const expressLayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const cors = require('cors');
const connectMongoDb = require('./database/connect');
const methodOverride = require('method-override');

// OTENTIKASI USER
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const { isAuthenticated } = require('./lib/auth');
const { getApikey, getRole, findAllUser } = require('./database/function');
const authRouters = require('./app/routes/auth.route');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const compression = require('compression');
// END OTENTIKASI USER
// == OTENTIFIKASI USER ==
das.set('trust proxy', 1);
das.use(compression());
das.set('view engine', 'ejs');
das.use(expressLayout);
das.use(express.static('public'));

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

// == END OTENTIFIKASI USER ==

// connect to database mongodb
connectMongoDb();

das.get('/', (req, res) => {
  // res.render('login', { layout: false });
  res.json({ message: 'haii :)' });
});

das.get('/tes', (req, res) => {
  res.render('tes', {
    layout: 'layouts/main',
  });
});

das.get('/api/dashboard', isAuthenticated, async (req, res) => {
  let getUser = await findAllUser();

  res.render('tes', {
    user: req.user,
    users: getUser,
    layout: 'layouts/main',
  });
});

// menghubungkan router
require('./app/routes/tool.route')(das);
require('./app/routes/student.route')(das);
require('./app/routes/islam.route')(das);
require('./app/routes/user.route')(das);
require('./app/routes/admin.route')(das);
das.use('/auth', authRouters);

// LISTEN

das.listen(port, () => {
  console.log(`Server started on PORT ${port}`);
});
