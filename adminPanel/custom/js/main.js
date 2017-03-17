/*
* @Author: mujibur
* @Date:   2017-03-17 19:04:15
* @Last Modified by:   ansar
* @Last Modified time: 2017-03-18 01:51:10
*/

'use strict';
( function () {
	var oScope = {

		baseURL: 'http://localhost:8080/All%20Projects/adminPanel/'

	};
	$( document ).ready( function () {
		toggleLoader.call( oScope, true );
		
		if( !oScope.jsonData )
			firebaseManage.call( oScope );

		
		oScope.log( 'hello' );
		console.log( oScope );
		( !window.oScope ) ? ( window.oScope = oScope ) : null;
	} );

	// --- reads the data from the firebase database
	function firebaseManage() {
		// Get a reference to the database service
		var database = firebase.database();


		var allElements = database.ref('elements/');
		console.log( allElements )
		allElements.on('value', function(snapshot) {
			console.log( snapshot.val() );

			oScope.jsonData = snapshot.val();

			addData.call( oScope );
			addEvents.call( oScope );

			toggleLoader.call( oScope, false );
		});
	}

	// --- create the view
	function addData() {
		
		var i,
			target = $( '.tableBody' ),
			nCount = 0;

		for( i in this.jsonData ) {
			nCount++;

			var tempData = this.jsonData[ i ];

			var markUp = '<tr><th scope="row"> ' + nCount + ' </th><td> ' + i + ' </td><td> ' + tempData.Symbol + ' </td><td><button id="edit" type="button" class="btn btn-warning" data=" ' + i + ' " >Edit</button></td><td><button id="delete" type="button" class="btn btn-danger" data=" ' + i + ' " >Delete</button></td></tr>'
			// console.log( i );
			target.append( markUp );

		}

	}

	function editElement( elemData ) {
		// body...
		oScope.log( elemData );
	}

	// --- move to corresponding page
	function addEvents() {
		
		$( '#allElm' ).off( 'click' ).on( 'click', function() {
			oScope.log( 'allElm' );
			// window.location.href = 'custom/pages/allElm.html';

		} );

		$( '#addElm' ).off( 'click' ).on( 'click', function() {
			oScope.log( 'addElm' );
			// window.location.href = 'custom/pages/addElm.html';
		} );


		$( '.tableBody' ).off( 'click' ).on( 'click', function( e ) {
			console.log( e.target.id );
		} );
	}

	// --- loader
	function toggleLoader( bool ) {
		
		if( bool )
			$( '#loader' ).show();
		else
			$( '#loader' ).hide();

	}

	// ---- adding properties to oScope

	oScope.log = function ( text, bg, color ) {
		
		var _bg = ( bg ) ? bg : '#000',
			_color = ( color ) ? color : '#FFF';

		console.log( '%c ' + text + ' ', 'background: ' + _bg +'; color: ' + _color );

	};

	oScope.logData = function ( data ) {
		console.log( logData );
	}

}() );