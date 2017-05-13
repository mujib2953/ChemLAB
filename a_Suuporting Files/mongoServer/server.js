/*
* @Author: mujibur
* @Date:   2017-05-10 14:11:10
* @Last Modified by:   mujibur
* @Last Modified time: 2017-05-12 12:00:53
*/

'use strict';

// var express = require( 'express' ),
// 	app = express(),
// 	port = process.env.PORT || 3001;


var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');                         // log requests to the console (express4)
var bodyParser = require('body-parser');                // pull information from HTML POST (express4)
var methodOverride = require('method-override');        // simulate DELETE and PUT (express4)
var cors = require('cors');


app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

var port = process.env.PORT || 3001;
var mongoose = require('mongoose'),
Task = require('./api/models/todoModel'),
bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:test@ds147789.mlab.com:47789/nitro_db'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/todoRouter');
routes(app);


app.listen( port );
console.log( 'My App is running at :: ', port );