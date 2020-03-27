var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

var indexRouter = require('./routes/index');
var serverlessFramework = require('./routes/serverlessFramework');
var monitoringTools = require('./routes/monitoringTools');
var vimEmu = require('./routes/vimEmu');
var osm = require('./routes/osm');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/serverlessFramework', serverlessFramework);
app.use('/monitoringTools', monitoringTools);
app.use('/vimEmu', vimEmu);
app.use('/osm', osm);

module.exports = app;
