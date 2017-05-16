/*
* @Author: Mujib Ansari
* @Date:   2017-05-16 16:08:04
* @Last Modified by:   Mujib Ansari
* @Last Modified time: 2017-05-16 20:32:37
*/

'use strict';

( function() {

	var oScope = {
		myData: {}
	};

	$( document ).ready( function() {

		readData.call( oScope );

	} );


	function readData() {

		$.get( 'files/reactionDetails.json', function( data ) {
			oScope.API_data = data;
			generate.call( oScope );

		} );

	};

	function generate() {

		var i,
			myObj = {};

		for( i in this.API_data ) {

			let tempData = this.API_data[ i ];



			createData.call( oScope, tempData.allElem, i );
			console.log( tempData.allElem );
		}

	};

	function createData( p_Arr, p_Key ) {

		var i = 0,
			j = 0;

		for( ; i < p_Arr.length; i++ ) {

			if( oScope.myData[ p_Arr[ i ] ] == undefined )
				oScope.myData[ p_Arr[ i ] ] = {};

			for( j = 0; j < p_Arr.length; j++ ) {


				if( p_Arr[ i ] != p_Arr[ j ] ) {
					
					// if( oScope.myData[ p_Arr[ i ] ].indexOf( p_Arr[ j ] ) == -1 )
					// 	oScope.myData[ p_Arr[ i ] ].push( p_Arr[ j ] );

					var tempData2 = oScope.myData[ p_Arr[ i ] ][ p_Arr[ j ] ] ;

					if( tempData2 == undefined )
						oScope.myData[ p_Arr[ i ] ][ p_Arr[ j ] ] = {};

					oScope.myData[ p_Arr[ i ] ][ p_Arr[ j ] ] = { elm: p_Key, e: p_Arr[ j ] }

				}

			}

		}
		console.log( oScope.myData );
	};

}() );