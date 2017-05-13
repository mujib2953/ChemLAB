/*
* @Author: mujibur
* @Date:   2017-04-18 18:48:30
* @Last Modified by:   mujibur
* @Last Modified time: 2017-04-28 09:10:28
*/

'use strict';
(function(){
	var oScope = {
		chemTree: {}
	};

	$( document ).ready( function() {

		getXMLData.call( oScope );

		readReactionXML.call( oScope );

		window.oScope = oScope;

		console.log( window.oScope )
	} );

	/*
	* Will read the info.xml file and 
	* assigned the string format data in our scope
	*/
	function getXMLData() {
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if( this.readyState == 4 && this.status == 200 ) {
				oScope.infoXML = xhttp.responseText;
				parse_info_XML.call( oScope );
			}
		};
		console.log( 'Reading file :: info.xml' );
		xhttp.open( 'GET', 'xml/info.xml', true );
		xhttp.send();
	};


	/*
	* Will pasre the xml data
	* Using jQuery
	*/
	function parse_info_XML() {
		
		var xmlDoc = $.parseXML( this.infoXML ),
			$xml = $( xmlDoc ),
			$root = $xml.find( 'ELEMENT' );

		var gArr = {};
		// console.log( xmlDoc );
		// console.log( $xml );
		// console.log( $root );

		$xml.find("ELEMENT").each(function(index,elem){
		    // elem = found XML element
		    // console.log( elem );

		    var nElementNumber = $( elem ).find( 'NUMBER' ).text();

		    var tempObj = {
		    	"elmNumber": nElementNumber,
		    	"elmDesc": $( elem ).find( 'TEXT' ).text()
		    }

		    gArr[ nElementNumber ] = tempObj

		    // gArr.push( tempObj );
		});
		oScope.elementsArray = gArr;
	};

	/*
	* Reads the reactions.xml file
	*/
	function readReactionXML() {

		var xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function() {
			
			if( this.status == 200 && this.readyState == 4 ) {
				oScope.reactionXML = xhttp.responseText;
				parse_reactions_XML.call( oScope );
			}
		}
		console.log( 'Reading file :: reactions.xml' );
		xhttp.open( 'GET', 'xml/reactions.xml', true );
		xhttp.send();
	};
	
	/*
	* Responsible for the parsing the reactions xml file.
	*/
	function parse_reactions_XML() {

		var xmlDoc = $.parseXML( this.reactionXML ),
			$xml = $( xmlDoc ),
			$root = $xml.find( 'REACTION' );

		var gReactions = {};

		$root.each( function( index, elem ) {

			var combiElements = $( elem ).find( 'ELEMENTS' ).text(),
				molecule = $( elem ).find( 'MOLECULE' ).text();

			combiElements = getUniqueElements.call( oScope, combiElements, molecule );

		} );
		console.log( this.chemTree );

		addToDB.call( oScope );
	};

	/*
	* @Params :: A string like "Na, Cl" or "Ag2, Br"
	* @Params :: A molucule name
	* this will return an Array having unique elelments like [ Na, Cla ] or [ Ag, Br ]
	*/
	function getUniqueElements( p_String, p_Molecule ) {

		// console.log( p_String );
		var elemArr = p_String.split( ',' ),
			uniqueArr = [],
			i;

		for( i in elemArr ) {

			elemArr[ i ] = removeNumeric.call( oScope, elemArr[ i ] );

			if( uniqueArr.indexOf( elemArr[ i ] ) == -1 )
				uniqueArr.push( elemArr[ i ] );

		}
		// console.log( '===============' );
		// console.log( elemArr );
		// console.log( uniqueArr );
		// console.log( p_Molecule );

		saveUnique.call( oScope, uniqueArr, p_Molecule );
	}

	/*
	* @Params :: A String of elements with number will come like Ag2
	* this function will return the element by removing that numberic factor
	*/
	function removeNumeric( p_String ) {

		var numericData = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' ];

		var atrArray = p_String.split( '' ),
			i,
			retArr = [];

		for( i in atrArray ) {

			if( numericData.indexOf( atrArray[ i ] ) == -1 )
				retArr.push( atrArray[ i ] );
		}

		return retArr.join( '' );
	};

	/*
	* @Params :: An array of the unique elements in the molucule
	* @Params :: A molucule
	* This will create the structure of chemTree
	*/
	function saveUnique( p_unqArr, p_Mol ) {

		var i = 0,
			j,
			nLen = p_unqArr.length;

		for( ; i < nLen; i++ ) {

			for( j = 0; j < nLen; j++ ) {

				if( p_unqArr[ i ] != p_unqArr[ j ] ) {

					var assignedObj = {
						elm: p_unqArr[ j ],
						molucule: p_Mol
					}

					if( isPresentInChemTree.call( oScope, p_unqArr[ i ] ) == false ) {
						
						this.chemTree[ p_unqArr[ i ] ] = {};
						addElement.call( oScope, p_unqArr[ i ], p_unqArr[ j ], assignedObj );
					}
					else
						addElement.call( oScope, p_unqArr[ i ], p_unqArr[ j ], assignedObj );
					
				}
			}
		}
	};

	/*
	* @Params :: a parent element like Na in NaCl
	* @params :: a child element like Cl in NaCl since Na is used in parent and vice-versa
	* This will create the chemTree i.e element and Molcule Tree
	*/
	function addElement( p_I, p_J, p_AssignedObj ) {

		if( this.chemTree[ p_I ][ p_J ] == undefined )
			this.chemTree[ p_I ][ p_J ] = [ p_AssignedObj ];
		else
			this.chemTree[ p_I ][ p_J ].push( p_AssignedObj );
	}

	/*
	* @Param :: an element like Na as an input.
	* This will just checks given element is present or not in the parent nodes of chemTree
	*/
	function isPresentInChemTree( p_Elem ) {
		return !!( this.chemTree[ p_Elem ] )
	}

	/*
	* This will add the json to the firebase data-base
	* NOTE :: For safty the code in the below function is commented. 
	* Like when we need to add the json just uncomment tthe code
	*/
	function addToDB() {
		// Get a reference to the database service
		var database = firebase.database();
		database.ref('reactions/').set( this.chemTree );
	};


}());