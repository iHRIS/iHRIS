var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var helmet = require("helmet");
var logger = require('morgan');
var cors = require('cors');
const env = process.env.NODE_ENV || "development";
const config = require("./config/config.json")[env];

var dashboardRouter = require('./routes/dashboard');
var siteUpRouter = require('./routes/siteUp');
var mheroRouter = require('./routes/mhero');
var practitionerRouter = require('./routes/practitioner');
var relationshipRouter = require('./routes/relationship');
var structureDefinitionRouter = require('./routes/structureDefinition');
var userRouter = require('./routes/user');

var app = express();

var corsOptions = {
  origin: function (origin, callback) {
    if (config.origins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("Attempted request from unknown origin: " + origin);
    }
  },
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(helmet());
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/site-up', siteUpRouter);
app.use('/dashboard', dashboardRouter);
app.use('/mhero', mheroRouter);
app.use('/practitioner', practitionerRouter);
app.use('/relationship', relationshipRouter);
app.use('/structure-definition', structureDefinitionRouter);
app.use('/user', userRouter);

module.exports = app;
