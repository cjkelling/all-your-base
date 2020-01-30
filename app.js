const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

var indexRouter = require('./routes/index');
var forecastRouter = require('./routes/api/v1/forecast');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Sweater_Weather';

app.use('/', indexRouter);
app.use('/api/v1/forecast', forecastRouter);

module.exports = app;
