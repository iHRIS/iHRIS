var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var dashboardRouter = require('./routes/dashboard');
var indexRouter = require('./routes/index');
var mheroRouter = require('./routes/mhero');
var practitionerRouter = require('./routes/practitioner');
var relationshipRouter = require('./routes/relationship');
var userRouter = require('./routes/user');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use( function( req, res, next ) {
  res.header( 'Access-Control-Allow-Origin', '*' )
  res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' )
  next()
})

app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/mhero', mheroRouter);
app.use('/practitioner', practitionerRouter);
app.use('/relationship', relationshipRouter);
app.use('/user', userRouter);

module.exports = app;
