/*
* @Author: mujibur
* @Date:   2017-05-10 12:44:33
* @Last Modified by:   mujibur
* @Last Modified time: 2017-05-10 12:50:27
*/

'use strict';

var app = require( './app' );
var port = process.env.PORT || 3001;

var db = require( './db' );


var server = app.listen( port, function() {
	console.log( 'Express Server listening at the port :: ', port );
} );