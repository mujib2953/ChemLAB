/*
* @Author: mujibur
* @Date:   2017-05-09 19:47:57
* @Last Modified by:   mujibur
* @Last Modified time: 2017-05-09 19:48:08
*/

'use strict';
for( var i = 0; i < a.length; i++ ) {
	debugger;
	var tbody_tr = $( a[ i ] ).find( 'tbody tr' );
	

	for( var j = 0; j < tbody_tr.length; j++ ) {

		for( var k = 0; k < $( tbody_tr[ j ] ).find( 'td' ).length; k++ ) {

			console.log( $( tbody_tr[ j ] ).find( 'td' )[ k ].innerHTML );
		}

    }
}