/*
* @Author: Mujib Ansari
* @Date:   2017-05-13 14:06:53
* @Last Modified by:   Mujib Ansari
* @Last Modified time: 2017-05-14 15:33:04
*/

'use strict';

( function() {
	var oScope = {
		nElmCount: 0
	};
	$( document ).ready( function(){
		start.call( oScope );
	} );


	function start() {
		getDataFromAPI.call( this );
	}


	function getDataFromAPI() {

		$.get( 'http://localhost:8031/api/readFile', function( data ) {
			console.log( 'success' );
			console.log( data );

			toggleLoader.call( oScope, false );
			oScope.API_data = data;
			creatSkeleton.call( oScope );
		} ).fail( function() {
			console.log( 'Reading API has problem.' );

			toggleLoader.call( oScope, false );
		} );

	};

	function writeDataToAPI( p_Obj, p_fCallBack ) {

		// /api/writeToFile
		console.log( p_Obj );

		var postData = { 
			fileName: "reactionDetails" 
			// data: p_Obj,
			// key: oScope.activeKey
		}

		$.post( "http://localhost:8031/api/writeToFile", 
			{
				"fileName": "reactionDetails",
				"data": JSON.stringify( p_Obj ),
				"key": oScope.activeKey
			}, function( data ) {
			console.log( data );
			p_fCallBack.call( oScope );
		}, "json");

	};

	function creatSkeleton() {

		var i;
		
		$( 'tbody' ).empty();
		this.nElmCount = 0;
		for( i in this.API_data ) {

			this.nElmCount++;

			$( 'tbody' ).append( `
				<tr >
					<th class="width-10" scope="row">` + this.nElmCount + `</th>
					<td class="width-60">` + i + `</td>
					<td class="width-20">
						<button type="button"  data-toggle="modal" data-target="#myModal" class="btn btn-primary shwDetBtn" customData="` + i + `">show details</button>
						<button type="button" class="btn btn-danger delBtn" customData="` + i + `">Delete</button>
					</td>
				</tr>
			` );
		}
		addEvents.call( oScope );
	};

	function addEvents() {

		$( '.shwDetBtn' ).off().on( 'click', function( e ) {
			var key = $( this ).attr( 'customData' ),
				response;
			
			oScope.activeKey = key;
			// console.log( key );
			response = getSpecificData.call( oScope, key );
			// console.log( response );
			if( response != undefined ) {
				setToFormData.call( oScope, response );
				$( '.modal' ).focus();
			}
		} );

		$( '.delBtn' ).off().on( 'click', function( e ) {
			console.log( $( this ).attr( 'customData' ) );

			$.post( "http://localhost:8031/api/deleteRow", {
				"key": $( this ).attr( 'customData' )
			}, function( data ) {
				console.log( data );
				oScope.API_data = data;
				creatSkeleton.call( oScope );
			}, "json");

		} );

		$( '.saveBtn' ).off().on( 'click', function( e ) {
			
			toggleLoader.call( oScope, true );
			var res = readFormData.call( oScope );
			writeDataToAPI.call( oScope, res, function () {
				$('#myModal').modal('hide');
				toggleLoader.call( oScope, false );
			} );
		} );

		$( '.addRowBtn' ).off().on( 'click', function( e ) {

			var res = readFormData.call( oScope );
			
			$.post( "http://localhost:8031/api/addDummyRow", {
				"fileName": "reactionDetails",
				"data": JSON.stringify( {} ),
				"key": Math.floor( Math.random()*10000 )
			}, function( data ) {
				console.log( data );
				oScope.API_data = data;
				creatSkeleton.call( oScope );
			}, "json");

		} );
	};

	function readFormData() {

		var obj = {
			"name": $( '#IUPAC' ).val(),
			"CAS": $( '#CAS' ).val(),
			"desc": $( '#desc' ).val(),
			"imgUrl": $( '#imgUrl' ).val(),
			"molar_mass": $( '#molar_mass' ).val(),
			"appearance": $( '#appearance' ).val(),
			"odor": $( '#odor' ).val(),
			"density": $( '#density' ).val(),
			"mp": $( '#mp' ).val(),
			"bp": $( '#bp' ).val(),
			"sol_prod": $( '#sol_prod' ).val(),
			"sol_wat": $( '#sol_wat' ).val(),
			"solblty": $( '#solblty' ).val(),
			"SHC": $( '#SHC' ).val(),
			"SME": $( '#SME' ).val(),
			"SEF": $( '#SEF' ).val(),
			"GE": $( '#GE' ).val(),
			"LC": $( '#LC' ).val(),
			"GHS": $( '#GHS' ).val(),
			"EU_DSD": $( '#EU_DSD' ).val(),
			"NFPA": $( '#NFPA' ).val(),
			"vp": $( '#vp' ).val(),
			"accidty": $( '#accidty' ).val(),
			"viscosty": $( '#viscosty' ).val(),
			"eq": $( '#formula' ).val().split( '|' )
		};
		return obj;
	};

	function setToFormData( p_obj ) {
		$( '#IUPAC' ).val( p_obj.name || '-' );
		$( '#CAS' ).val( p_obj.CAS || '-' );
		$( '#desc' ).val( p_obj.desc || '-' );
		$( '#imgUrl' ).val( p_obj.imgUrl || '-' );
		$( '#molar_mass' ).val( p_obj.molar_mass || '-' );
		$( '#appearance' ).val( p_obj.appearance || '-' );
		$( '#odor' ).val( p_obj.odor || '-' );
		$( '#density' ).val( p_obj.density || '-' );
		$( '#mp' ).val( p_obj.mp || '-' );
		$( '#bp' ).val( p_obj.bp || '-' );
		$( '#sol_prod' ).val( p_obj.sol_prod || '-' );
		$( '#sol_wat' ).val( p_obj.sol_wat || '-' );
		$( '#solblty' ).val( p_obj.solblty || '-' );
		$( '#SHC' ).val( p_obj.SHC || '-' );
		$( '#SME' ).val( p_obj.SME || '-' );
		$( '#SEF' ).val( p_obj.SEF || '-' );
		$( '#GE' ).val( p_obj.GE || '-' );
		$( '#LC' ).val( p_obj.LC || '-' );
		$( '#GHS' ).val( p_obj.GHS || '-' );
		$( '#EU_DSD' ).val( p_obj.EU_DSD || '-' );
		$( '#NFPA' ).val( p_obj.NFPA || '-' );
		$( '#vp' ).val( p_obj.vp || '-' );
		$( '#accidty' ).val( p_obj.accidty || '-' );
		$( '#viscosty' ).val( p_obj.viscosty || '-' );
		$( '#formula' ).val( p_obj.eq.join( '|' ) || '-' );
	};	

	function getSpecificData( p_Id ) {
		return this.API_data[ p_Id ];
	};
	function toggleLoader( bool ) {
		
		if( bool )
			$( '#loader' ).show();
		else
			$( '#loader' ).hide();
	};

}() );