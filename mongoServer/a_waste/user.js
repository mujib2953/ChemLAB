/*
* @Author: mujibur
* @Date:   2017-05-10 13:01:48
* @Last Modified by:   mujibur
* @Last Modified time: 2017-05-10 13:53:13
*/

'use strict';
var mongoose = require( 'mongoose' );
var userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String
});

mongoose.model( 'User', userSchema );

module.exports = mongoose.model( 'User' );