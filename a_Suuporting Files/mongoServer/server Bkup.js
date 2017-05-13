/*
* @Author: mujibur
* @Date:   2017-05-10 14:11:10
* @Last Modified by:   mujibur
* @Last Modified time: 2017-05-10 15:19:03
*/

'use strict';

var express = require( 'express' ),
	app = express(),
	port = process.env.PORT || 3001;


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