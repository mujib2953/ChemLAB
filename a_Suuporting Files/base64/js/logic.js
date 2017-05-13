/*
* @Author: mujibur
* @Date:   2017-04-18 18:48:30
* @Last Modified by:   mujibur
* @Last Modified time: 2017-05-05 14:58:04
*/

'use strict';
(function(){
	var oScope = {};

	$( document ).ready( function() {

		$( '#genBtn' ).off( 'click' ).on( 'click', function(){

			var imgPath = $( '#imgURL' ).val();
			toDataURL(imgPath, function(dataUrl) {
				console.log('RESULT:', dataUrl);
				$( '#base64Text' ).text( dataUrl );
			})
			
		});

	} );

	function toDataURL(url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.onload = function() {
			var reader = new FileReader();
			reader.onloadend = function() {
				callback(reader.result);
			}
			reader.readAsDataURL(xhr.response);
		};
		xhr.open('GET', url);
		xhr.responseType = 'blob';
		xhr.send();
	}


	

}());