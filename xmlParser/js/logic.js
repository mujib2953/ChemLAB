/*
* @Author: mujibur
* @Date:   2017-04-18 18:48:30
* @Last Modified by:   mujibur
* @Last Modified time: 2017-04-18 19:39:04
*/

'use strict';
(function(){
	var oScope = {};

	$( document ).ready( function() {

		getXMLData.call( oScope );
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

				parseXML.call( oScope );
			}

		};

		xhttp.open( 'GET', 'xml/info.xml', true );
		xhttp.send();

	};


	/*
	* Will pasre the xml data
	* Using jQuery
	*/
	function parseXML() {
		
		var xmlDoc = $.parseXML( this.infoXML ),
			$xml = $( xmlDoc ),
			$root = $xml.find( 'ELEMENT' );

		var gArr = [];
		console.log( xmlDoc );
		console.log( $xml );
		console.log( $root );

		$xml.find("ELEMENT").each(function(index,elem){
		    // elem = found XML element
		    // console.log( elem );
		    var tempObj = {
		    	"elmNumber": $( elem ).find( 'NUMBER' ).text(),
		    	"elmDesc": $( elem ).find( 'TEXT' ).text()
		    }

		    gArr.push( tempObj );
		});

		console.log( gArr );
	};

}());