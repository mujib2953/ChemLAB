/*
* @Author: mujibur
* @Date:   2017-05-10 12:42:50
* @Last Modified by:   mujibur
* @Last Modified time: 2017-05-10 14:01:38
*/

'use strict';

var express = require( 'express' );
var app = express();

var UserController = require('./UserController');
app.use('/users', UserController);

module.exports = app;