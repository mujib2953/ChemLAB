/*
* @Author: mujibur
* @Date:   2017-05-10 13:05:47
* @Last Modified by:   mujibur
* @Last Modified time: 2017-05-10 13:52:21
*/

'use strict';
var express = require( 'express' );
var router = express.Router();
var bodyParser = require( 'body-parser' );

router.use( bodyParser.urlencoded({ extended: true }) );

var User = require( './User' );

/*---- logic -----*/

/*
*  Adding User
*/
router.post( './', function( req, res ) {
	User.create({
		name: req.body.name,
		email: req.body.email,
		pswd: req.body.pswd
	}, function( err, user ){
		if (err) 
			return res.status(500).send("There was a problem adding the information to the database.");
        res.status(200).send(user);
	});
} );

/*
*  Retriving All user
*/
router.get( './', function( req, res ) {

	User.find( {}, function( err, user ) {
		if (err) 
			return res.status(500).send("There was a problem finding the users.");

		res.status(200).send(users);
	});

} );



module.exports = router;