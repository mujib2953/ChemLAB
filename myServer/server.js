/*
* @Author: Mujib Ansari
* @Date:   2017-05-13 14:32:44
* @Last Modified by:   Mujib Ansari
* @Last Modified time: 2017-05-21 17:26:23
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


/*----- Application Vars ----- */
var allElements;


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


    	if( fileData[ key ].imgUrl != data.imgUrl ) {

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
    	} else {

    		fileData[ key ] = JSON.parse( data );
    		
    		fs.writeFile( 'files/' + fileName + '.json', JSON.stringify( fileData ), function() {
				res.json( fileData );
			} );
    	}

	    	

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

app.post( '/api/addGlobalProp', function( req, res ) {

	var key = req.body.key;
	console.log( 'key :: ' + key );
	fs.readFile( 'files/reactionDetails.json', 'utf8', function( err, fileData ) {

		if( err ) res.send( err );

		fileData = JSON.parse( fileData );

		for( var i in fileData ) {
			if( fileData[ i ][ key ] == undefined ) {
				fileData[ i ][ key ] = '';
			}

		}

		fs.writeFile( 'files/reactionDetails.json', JSON.stringify( fileData ), function() {
			res.json( fileData );
		} );

	} );

} );

app.post( '/api/deleteGlobalProp', function( req, res ) {

	var key = req.body.key;

	fs.readFile( 'files/reactionDetails.json', 'utf8', function( err, fileData ) {

		if( err ) res.send( err );

		fileData = JSON.parse( fileData );

		for( var i in fileData ) {

			if( fileData[ i ][ key ] != undefined ) {
				delete fileData[ i ][ key ];
			}

		}
		fs.writeFile( 'files/reactionDetails.js', JSON.stringify( fileData ), function() {
			res.send( fileData )
		} );
	} )

} );




// -------------- All Elements -------------------------
app.get( '/api/allElmConvertBase64', function( req, res ) {

	fs.readFile( 'files/allElements.json', function( err, fileData ) {

		if( err ) res.send( err );

		fileData = JSON.parse( fileData );

		var myKey = 0,
			fileSize = fileData.length,
			imgArr = {};

		var doTask = function() {
			console.log( myKey + ' Starting..' );

			if( fileData[ myKey ].imgBase64 == undefined ) {
				requestAPI.get( fileData[ myKey ].img_src, function (error, response, body) {
				
					if (!error && response.statusCode == 200) {
						
						var data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
			
						fileData[ myKey ].imgBase64 = data;
						console.log( myKey + 'writting to file...' );
						
						imgArr[ myKey ] = data
						fs.writeFile( 'files/allElements.json', JSON.stringify( fileData ), function() {
							console.log( myKey + 'writting Completed...' );
							
							if( myKey > fileSize-2 ){
								console.log( ' *** Completed *** ' );
								res.json( fileData );
							}
							else {
								myKey++;
								doTask();
							}

						} );
					}

				});
			} else {
				if( myKey > fileSize-2 ){
					console.log( ' *** Completed *** ' );
					res.json( fileData );
				}
				else {
					myKey++;
					doTask();
				}
			}

		}
		doTask();

	} );

} );


app.get( '/api/rearrange', function( req, res ) {

	
	// fs.readFile( 'files/allElements.json', function( err, fileData ) {

	// 	if( err ) res.send( err );
	// 	fileData = JSON.parse( fileData );

	// 	var newJSon = {};

	// 	for( var i in fileData ) {

	// 		newJSon[ fileData[ i ].symbol ] = fileData[ i ];

	// 	}

	// 	fs.writeFile( 'files/allElements.json', JSON.stringify( newJSon ), function() {
	// 		console.log( 'writting Completed..' );
	// 		res.send( newJSon )
	// 	});

	// } );



	fs.readFile( 'files/allElements.json', function( err, fileData ) {

		if( err ) res.send( err );
		fileData = JSON.parse( fileData );

		var AllElements = [];

		for( var i in fileData ) {
			AllElements.push( {
				symbol: fileData[ i ].symbol,
				name: fileData[ i ].name,
			} );
		}

		fileData[ 'AllElements' ] = AllElements;

		fs.writeFile( 'files/allElements.json', JSON.stringify( fileData ), function() {
			console.log( 'writting Completed..' );
			res.send( fileData )
		});
	});

} );


app.get( '/api/getElements/:name', function( req, res ) {
	var elm = req.params.name;

	if( allElements ) {
		res.send( allElements[ elm ] );
	} else {
		readFileData( req, res , function() {
			res.send( allElements[ elm ] );
		} );
	}

} );

app.get( '/api/getAllElms', function( req, res ) {

	if( allElements ) {
		res.send( allElements[ 'AllElements' ] );
	} else {
		readFileData( req, res , function() {
			res.send( allElements[ 'AllElements' ] );
		} );
	}

} );



function readFileData( req, res, p_fCallback ) {

	fs.readFile( 'files/allElements.json', function( err, fileData ) {
		if( err ) res.send( err );
		allElements = JSON.parse( fileData );
		if( p_fCallback )
			p_fCallback();
	} );

}

// ------------------------- port -------------------------
app.listen(8031);
console.log( 'Server is running at :: 8031' );