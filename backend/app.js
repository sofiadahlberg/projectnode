require('dotenv').config()
var createError = require('http-errors');
const express = require('express');
const app = express();
const cors = require('cors');
// Använd cors middleware
app.use(cors());

const mongoose = require('mongoose');
//Anslut till mongoose och dbanslutning
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.error('connected to database '));

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

app.use(express.json())
//Importera router från order och store
const orderRoutes = require('./routes/order')
app.use('/order', orderRoutes);
const storeRoutes = require('./routes/store')
app.use('/store', storeRoutes);
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
//Ansluta till path 4000
app.listen(4000, () => {
  console.log('server listening');
});


// Importe från view
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward hantera error-meddelande
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

 
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

