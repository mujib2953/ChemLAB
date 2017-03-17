/*
* @Author: mujibur
* @Date:   2017-03-17 19:04:15
* @Last Modified by:   mujibur
* @Last Modified time: 2017-03-17 19:52:06
*/

'use strict';
( function () {
	var oScope = {

		baseURL: 'http://localhost:8080/All%20Projects/adminPanel/'

	};
	$( document ).ready( function () {
		toggleLoader.call( oScope, true );
		console.log( oScope.jsonData )
		if( !oScope.jsonData )
			firebaseManage.call( oScope );

		addEvents.call( oScope );
		oScope.log( 'hello' );
		console.log( oScope );
		( !window.oScope ) ? ( window.oScope = oScope ) : null;
	} );

	function firebaseManage() {
		// Get a reference to the database service
		var database = firebase.database();


		var allElements = database.ref('elements/');
		console.log( allElements )
		allElements.on('value', function(snapshot) {
			console.log( snapshot.val() );

			oScope.jsonData = snapshot.val();
			toggleLoader.call( oScope, false );
		});
	}

	// --- move to corresponding page
	function addEvents() {
		
		$( '#allElm' ).off( 'click' ).on( 'click', function() {
			oScope.log( 'allElm' );
			window.location.href = 'custom/pages/allElm.html';

		} );

		$( '#addElm' ).off( 'click' ).on( 'click', function() {
			oScope.log( 'addElm' );
			window.location.href = 'custom/pages/addElm.html';
		} );

	}

	function toggleLoader( bool ) {
		
		if( bool )
			$( '#loader' ).show();
		else
			$( '#loader' ).hide();

	}

	// ---- 

	oScope.log = function ( text, bg, color ) {
		
		var _bg = ( bg ) ? bg : '#000',
			_color = ( color ) ? color : '#FFF';

		console.log( '%c ' + text + ' ', 'background: ' + _bg +'; color: ' + _color );

	};

	oScope.logData = function ( data ) {
		console.log( logData );
	}

}() );