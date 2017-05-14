/*
* @Author: Mujib Ansari
* @Date:   2017-05-13 14:32:44
* @Last Modified by:   Mujib Ansari
* @Last Modified time: 2017-05-14 15:30:50
*/

'use strict';

var fs 					= require( 'fs' ),					// ---
	express 			= require( 'express' ),				// ---
	app 				= express(),						// --- create express app
	mongoose 			= require( 'mongoose' ),			// --- mongoose for mongoodb
	morgan 				= require( 'morgan' ),				// --- logs request to the console express
	bodyParser 			= require( 'body-parser' ),			// --- pulls info from HTML post
	methodOverride 		= require( 'method-override' ),		// --- simulate DELETE and PUT express
	cors 				= require( 'cors' ),
	XMLHttpRequest 		= require("xmlhttprequest").XMLHttpRequest,
	FileReader 			= require('filereader'),
	requestAPI 			= require('request').defaults({ encoding: null }),
	http 				= require( 'http' );				// --- 

var dbURL = 'mongodb://127.0.0.1:27017',
	db = '/chemLab';


mongoose.connect( dbURL + db );

app.use( morgan( 'dev' ) ); 										// --- Logs every request to server console
app.use( bodyParser.urlencoded( { 'extended': 'true' } ) );		// --- parse application/x-www-frm-urlencoded
app.use( bodyParser.json() );										// --- parse application/json
app.use( bodyParser.json( { type: 'application/vnd.api+json' } ) ); // --- parse application/vnd.api+json
app.use( methodOverride() );
app.use( cors() );

/* --- Below is the code for HTTP header --- */
// app.use( function( req, res, next ) {
// 	res.header( 'Access-Control-Allow-Origin', '*' );
// 	res.header( 'Access-Control-Allow-Method', 'DELETE, PUT' );
// 	res.header( 'Access-Control-Allow-Header', 'Origin, X-Requestd-With, Content-Type, Accept' );
// } );
/* --- HTTP header code ended --- */

/* --- Model cretation starts --- */
var ReviewModel = mongoose.model('ReviewModel', {
	name: String,
	rating: Number
});
/* --- Model creation ends --- */

// ------------------- GET Request ----------------------

app.get( '/api/getRatings', function( req, res ) {
	console.log( '****** Reading ratings *******' );

	ReviewModel.find( function( err, reviews ) {

		if( err ) res.send( err );

		res.json( reviews );
		console.log( 'review sent' );
	} );
} );

// ------------------- GET Request Ends -----------------

// ------------------- POST Request ----------------------

app.post( '/api/postRatings', function( req, res ) {
	console.log( '****** Storing ratings *******' );

	ReviewModel.create({
		name: req.body.name,
		rating: req.body.rating,
		isVarified: false
	}, function( err, review ) {

		if( err ) res.send( err );

		ReviewModel.find( function( err, review ) {
			
			if( err ) res.send( err );

			res.json( review );

		} );
	});

} );

// ------------------- POST Request Ends -----------------

// ------------------- DELETE Request ----------------------

app.delete( '/api/deletReview/:id', function( req, res ) {

	ReviewModel.remove({
		_id: req.params.id
	}, function( err, reviews ) {
		if( err ) res.send( err );

		res.json( reviews );
	});

} );

// ------------------- DELETE Request Ends -----------------

/* ---------------------------------------------------------
-------------------- File System API -----------------------
------------------------------------------------------------*/

app.get( '/api/readFile', function( req, res ) {
	fs.readFile( 'files/reactionDetails.json', 'utf8', function( err, data ) {
		if( err ) res.send( err );
		res.json( JSON.parse( data ) );
	} );
} );

app.post( '/api/writeToFile', function( req, res ) {

	var fileName = req.body.fileName,
		data = req.body.data,
		key = req.body.key;

    fs.readFile( 'files/' + fileName + '.json', 'utf8', function( err, fileData ) {

    	if( err ) res.send( err );

    	fileData = JSON.parse( fileData );

    	fileData[ key ] = JSON.parse( data );

		requestAPI.get( fileData[ key ].imgUrl, function (error, response, body) {
			
			if (!error && response.statusCode == 200) {
				
				data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
				// console.log(data);

				fileData[ key ].imgBase64 = data;
				fs.writeFile( 'files/' + fileName + '.json', JSON.stringify( fileData ), function() {
					res.json( fileData );
				} );
			}

		});		

    } );
} );


app.post( '/api/addDummyRow', function( req, res ) {

	var fileName = req.body.fileName,
		data = req.body.data,
		key = req.body.key;

    fs.readFile( 'files/' + fileName + '.json', 'utf8', function( err, fileData ) {

    	if( err ) res.send( err );

    	fileData = JSON.parse( fileData );

    	fileData[ key ] = JSON.parse( data );

		fs.writeFile( 'files/' + fileName + '.json', JSON.stringify( fileData ), function() {
			res.json( fileData );
		} );

    } );
} );

app.post( '/api/deleteRow', function( req, res ) {

	var key = req.body.key;

	fs.readFile( 'files/reactionDetails.json', 'utf8', function( err, fileData ) {

		if( err ) res.send( err );

		fileData = JSON.parse( fileData );

		if( fileData[ key ] != undefined )
			delete fileData[ key ];
		fs.writeFile( 'files/reactionDetails.json', JSON.stringify( fileData ), function() {
			res.json( fileData );
		} );
	} );
} );


function base64_encode(file) {
    // read  binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

function toDataURL(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onload = function() {
		var reader = new FileReader();
		// reader.onloadend = function() {
		// 	callback(reader.result);
		// }

		reader.addEventListener('load', function (ev) {
			console.log("dataUrlSize:", ev.target.result.length);
		});
		reader.readAsDataURL(xhr.response);
	};
	xhr.open('GET', url);
	xhr.responseType = 'blob';
	xhr.send();
	
}




// ------------------------- port -------------------------
app.listen(8031);
console.log( 'Server is running at :: 8031' );