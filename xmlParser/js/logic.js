/*
* @Author: mujibur
* @Date:   2017-04-18 18:48:30
* @Last Modified by:   mujibur
* @Last Modified time: 2017-04-21 20:42:21
*/

'use strict';
(function(){
	var oScope = {};

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
	};

	/*
	* @Params :: A string like "Na, Cl" or "Ag2, Br"
	* @Params :: A molucule name
	* this will return an Array having unique elelments like [ Na, Cla ] or [ Ag, Br ]
	*/
	function getUniqueElements( p_String, p_Molecule ) {

		console.log( p_String );
		var elemArr = p_String.split( ',' ),
			uniqueArr = [],
			i;

		for( i in elemArr ) {

			elemArr[ i ] = removeNumeric.call( oScope, elemArr[ i ] );

			if( uniqueArr.indexOf( elemArr[ i ] ) == -1 )
				uniqueArr.push( elemArr[ i ] );

		}
		// console.log( elemArr );
		// console.log( uniqueArr );

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
	* 
	*/

	function manageReactions() {
	};

}());