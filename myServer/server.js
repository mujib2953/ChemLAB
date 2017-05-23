/*
* @Author: Mujib Ansari
* @Date:   2017-05-13 14:32:44
* @Last Modified by:   mujibur
* @Last Modified time: 2017-05-23 14:39:33
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
	http 				= require( 'http' ),				// --- 
	https 				= require( 'https' );				// --- 

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
var allElements,
	AllReaction,
	chemTree;


/* --- Below is the code for HTTP header --- */
// app.use( function( req, res, next ) {
// 	res.header( 'Access-Control-Allow-Origin', '*' );
// 	res.header( 'Access-Control-Allow-Method', 'DELETE, PUT' );
// 	res.header( 'Access-Control-Allow-Header', 'Origin, X-Requestd-With, Content-Type, Accept' );
// } );
/* --- HTTP header code ended --- */


/* ---------------------------------------------------------
-------------------- File System API -----------------------
------------------------------------------------------------*/


/*
*  Reaction Admin Page
*/

// ***  Reads the JSON files
app.get( '/api/readReactionData', function( req, res ) {
	
	if( AllReaction ) {
		res.json( AllReaction );
	} else  {
		readReactionFile( req, res, function() {
			res.json( AllReaction );
		} );
	}
} );

// ***  writes the JSON files
app.post( '/api/writeReactionData', function( req, res ) {

	var data = req.body.data,
		key = req.body.key;
	console.log( 'Writing to file' );
	
	if( AllReaction ) {
		manageWriteOperation( AllReaction, data, key, req, res );
	} else  {
		readReactionFile( req, res, function() {
			manageWriteOperation( AllReaction, data, key, req, res );
		} )
	}
} );
function manageWriteOperation( p_fileData, p_data, p_key, req, res ) {
	console.log( 'manageWriteOperation reactionDetails started' );
	if( p_data.imgUrl && ( p_fileData[ p_key ].imgUrl != p_data.imgUrl ) ) {
		p_fileData[ p_key ] = JSON.parse( p_data );

		requestAPI.get( p_fileData[ p_key ].imgUrl, function (error, response, body) {

			if ( !error && response.statusCode == 200 ) {
				console.log( 'base64 completed' );
				var imgData = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
					
				p_fileData[ p_key ].imgBase64 = imgData;
				
				writeToReactionFile( p_fileData, function() {
					creatReact( p_fileData[ p_key ][ 'allElem' ], p_key, function() {
						console.log( 'Evert thing completed sending response' );
						res.json( p_fileData );
					} );
				} );
			}

		});		
	} else {
		console.log( 'No base64 Found Fine' );
		p_fileData[ p_key ] = JSON.parse( p_data );
		
		writeToReactionFile( p_fileData, function() {
			creatReact( p_fileData[ p_key ][ 'allElem' ], p_key, function() {
				console.log( 'Evert thing completed sending response' );
				res.json( p_fileData );
			} );	
		} );
	}
};
function creatReact( p_arr, p_comp, p_fCallback ) {
	
	console.log( 'Creating ChemTree started' );
	var reactionJSON;

	fs.readFile( 'files/chemTree.json', function( err, p_fileData ) {
		reactionJSON = JSON.parse( p_fileData );

		for( var i in p_arr ) {

			for( var j in p_arr ) {

				if( p_arr[ i ] != p_arr[ j ] ) {

					if( reactionJSON[ p_arr[ i ] ] == undefined ) {

						reactionJSON[ p_arr[ i ] ] = {};

						if( reactionJSON[ p_arr[ i ] ][ p_arr[ j ] ] == undefined )
							reactionJSON[ p_arr[ i ] ][ p_arr[ j ] ] = [ p_comp ]
						else
							reactionJSON[ p_arr[ i ] ][ p_arr[ j ] ].push( p_comp );

					} else {

						if( reactionJSON[ p_arr[ i ] ][ p_arr[ j ] ] == undefined )
							reactionJSON[ p_arr[ i ] ][ p_arr[ j ] ] = [ p_comp ]
						else
							reactionJSON[ p_arr[ i ] ][ p_arr[ j ] ].push( p_comp );

					}

				}

			}

		}

		// console.log( reactionJSON );
		fs.writeFile( 'files/chemTree.json', JSON.stringify( reactionJSON ), function() {
			console.log( 'Writing ChemTree started' );
			if( p_fCallback )
				p_fCallback();
		} );

	} );
}

// ***  Add dummy row in the JSON files
app.post( '/api/addDummyRow', function( req, res ) {

	var data = req.body.data,
		key = req.body.key;

	if( AllReaction ) {
		manageAddDummyRow( key, data, function() {
			writeToReactionFile( AllReaction, function() {
				res.json( AllReaction );
			} );
		} );
	} else  {
		readReactionFile( req, res, function() {
			manageAddDummyRow( key, data, function() {
				writeToReactionFile( AllReaction, function() {
					res.json( AllReaction );
				} );
			} );
		} )
	}
} );
function manageAddDummyRow( p_key, p_data, p_fCallback ) {
	AllReaction[ p_key ] = JSON.parse( p_data );
	if( p_fCallback )
		p_fCallback();
};

// ***  Delete row from the JSON files
app.post( '/api/deleteRow', function( req, res ) {

	var key = req.body.key;

	if( AllReaction ) {
		manageDeleteRow( key, function() {
			writeToReactionFile( AllReaction, function() {
				res.json( AllReaction );
			} );
		} );
	} else  {
		readReactionFile( req, res, function() {
			manageDeleteRow( key, function() {
				writeToReactionFile( AllReaction, function() {
					res.json( AllReaction );
				} );
			} );
		} )
	}
} );
function manageDeleteRow( p_key, p_fCallback ) {

	if( AllReaction[ p_key ] != undefined )
		delete AllReaction[ p_key ];

	if( p_fCallback )
		p_fCallback();

};

// *** Adds global Property to JSON file
app.post( '/api/addGlobalProp', function( req, res ) {

	var key = req.body.key;
	console.log( 'key :: ' + key );

	if( AllReaction ) {
		manageAddGlobalProp( key, function() {
			writeToReactionFile( AllReaction, function() {
				res.json( AllReaction );
			} );
		} );
	} else  {
		readReactionFile( req, res, function() {
			manageAddGlobalProp( key, function() {
				writeToReactionFile( AllReaction, function() {
					res.json( AllReaction );
				} );
			} );
		} );
	}
} );
function manageAddGlobalProp( p_key, p_fCallback ) {

	var i;
	for( i in AllReaction ) {
		if( AllReaction[ i ][ p_key ] == undefined )
			AllReaction[ i ][ p_key ] = '';
	}

	if( p_fCallback )
		p_fCallback();

};

// *** Delete global Property from JSON file
app.post( '/api/deleteGlobalProp', function( req, res ) {

	var key = req.body.key;

	if( AllReaction ) {
		manageDelGlobalProp( key, function() {
			writeToReactionFile( AllReaction, function() {
				res.json( AllReaction );
			} );
		} );
	} else  {
		readReactionFile( req, res, function() {
			manageDelGlobalProp( key, function() {
				writeToReactionFile( AllReaction, function() {
					res.json( AllReaction );
				} );
			} );
		} );
	}
} );

function manageDelGlobalProp( p_key, p_fCallback ) {

	var i;

	for( i in AllReaction ) {
		if( AllReaction[ i ][ p_key ] != undefined )
			delete AllReaction[ i ][ p_key ];
	}

	if( p_fCallback )
		p_fCallback();

};

// *********************************************************************************** //
/*
*  Mobile App API's
*/

// 1. **** Return All Elements name and symbol
app.get( '/api/getAllElms', function( req, res ) {

	if( allElements ) {
		res.send( allElements[ 'AllElements' ] );
	} else {
		readFileData( req, res , function() {
			res.send( allElements[ 'AllElements' ] );
		} );
	}

} );

// 2. *** Return all property of the Element 
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

app.get( '/api/getFirstTierChemTree', function( req, res ) {

	if( chemTree ) {
		manageFirstTier( function( p_retArr ) {
			res.json( { result: p_retArr } );
		} );
	} else {
		readChemTree( req, res, function() {
			manageFirstTier( function( p_retArr ) {
				res.json( { result: p_retArr } );
			} );
		} );
	}

} );
function manageFirstTier( p_fCallback ) {

	var retArr = [],
		i;

	for( i in chemTree ) {

		retArr.push( i );
	}
	console.log( retArr );
	if( p_fCallback )
		p_fCallback( retArr );
};

app.get( '/api/getSecondTierChemTree/:name', function( req, res ) {

	var elmName = req.params.name;

	if( chemTree ) {
		manageSecondTier( elmName, function( p_retArr ) {
			res.json( { result: p_retArr } );
		} );
	} else {
		readChemTree( req, res, function() {
			manageSecondTier( elmName, function( p_retArr ) {
				res.json( { result: p_retArr } );
			} );
		} );
	}

} );
function manageSecondTier( p_Name, p_fCallback ) {

	var retObj = chemTree[ p_Name ];
	if( p_fCallback )
		p_fCallback( retObj );

}


app.get( '/api/getReactionDetails/:compound', function( req, res ) {

	var comp = req.params.compound;
	console.log( comp );
	if( AllReaction ) {
		if( AllReaction[ comp ] )
			res.json( AllReaction[ comp ] );
		else 
			res.send( 'Not found' );
	} else {
		readReactionFile( req, res, function() {
			// console.log( AllReaction[ comp ] );
			if( AllReaction[ comp ] )
				res.json( AllReaction[ comp ] );
			else 
				res.send( 'Not found' );
		} );
	}

} );


// --- Reading All Element json
function readFileData( req, res, p_fCallback ) {

	fs.readFile( 'files/allElements.json', function( err, fileData ) {
		if( err ) res.send( err );
		allElements = JSON.parse( fileData );
		if( p_fCallback )
			p_fCallback();
	} );



}

// --- Reading reaction Details json
function readReactionFile( req, res, p_fCallback ) {
	console.log( 'Reading reactionDetails file' );
	fs.readFile( 'files/reactionDetails.json', function( err, allReact ) {
		if( err ) res.send( err );

		AllReaction = JSON.parse( allReact );
		
		if( p_fCallback )
			p_fCallback();
	} );

};

// --- Writing reaction Details json
function writeToReactionFile( p_data, p_fCallback ) {
	console.log( 'Writting to reactionDetails started' );
	fs.writeFile( 'files/reactionDetails.json', JSON.stringify( p_data ), function() {
		if ( p_fCallback )
			p_fCallback();
	} );
}

// --- Reading chemTree json
function readChemTree( req, res, p_fCallback ) {
	fs.readFile( 'files/chemTree.json', function( err, chemTreeData ) {
		if( err ) res.send( err );

		chemTree = JSON.parse( chemTreeData );

		if( p_fCallback )
			p_fCallback();
	} );
}
// ------------------------- port -------------------------
app.listen(8031);
console.log( 'Server is running at :: 8031' );

// ---------------------------------------------------------------------------
//  ----------------- Supporting API's ---------------------------------------

app.get( '/api/rearrange', function( req, res ) {

	// fs.readFile( 'files/reactionDetails.json', function( err, reactionDD ) {
	// 	if( err ) res.send( err );

		
	// 	reactionDD = JSON.parse( reactionDD );


	// 	for( var i in reactionDD ) {

	// 		var allElem = reactionDD[ i ][ 'allElem' ];
	// 		creatReact( allElem, i );		

	// 	}

	// 	fs.writeFile( 'files/reactions.json', JSON.stringify( gJSON ), function() {
			
	// 		res.send( gJSON );
	// 	} );
	// } );

} );

