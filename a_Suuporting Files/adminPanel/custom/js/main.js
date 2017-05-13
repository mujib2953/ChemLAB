/*
* @Author: mujibur
* @Date:   2017-03-17 19:04:15
* @Last Modified by:   Mujib Ansari
* @Last Modified time: 2017-04-09 12:43:59
*/

'use strict';
( function () {
	var oS = {
		oxidationIsotopesCount: 0,
	};
	$( document ).ready( function () {
		toggleLoader.call( oS, true );
		
		if( !oS.jsonData )
			firebaseManage.call( oS );

		( !window.oS ) ? ( window.oS = oS ) : null;
	} );

	// --- reads the data from the firebase database
	function firebaseManage() {

		toggleLoader.call( oS, true );
		// Get a reference to the database service
		var database = firebase.database();
		$( '#AllElementsTable' ).empty();

		// var allElementsRef = database.ref('elements/');
		var allElementsRef = database.ref('newElements/');
		allElementsRef.on('value', function( data ) {

			oS.jsonData = data.val();
			
			addData.call( oS );
			addEvents.call( oS );

			toggleLoader.call( oS, false );
		});
	}


	// --- create the view of all the elements and the edit button
	function addData() {
		
		var i,
			target = $( '.tableBody' ),
			nCount = 0;
			
		sortData.call( oS );

		for( i in this.jsonData ) {
			nCount++;

			var tempData = this.jsonData[ i ];
			// console.log( tempData );
			var markUp = '<tr><th scope="row"> ' + nCount + ' </th><td> ' + i + ' </td><td> ' + tempData.symbol + ' </td><td><button id="edit" type="button" class="btn btn-warning" data=" ' + i + ' " data-toggle="modal" data-target="#myModal" >Edit</button></td><td><button id="delete" type="button" class="btn btn-danger" data=" ' + i + ' " >Delete</button></td></tr>'
			// console.log( i );
			target.append( markUp );

		}

	}

	// ---- sort data according to Atomic number
	function sortData() {

		var tempData = [];

		for( var i in this.jsonData ) {

			// tempData[ i ] = this.jsonData[ i ];

			// console.log( i, this.jsonData[ i ] );

			tempData[ i ] = this.jsonData[ i ];
		}

		console.log( tempData );
	}
	
	// --- move to corresponding page
	function addEvents() {
		
		// --- All element list will be shown
		$( '#allElm' ).off( 'click' ).on( 'click', function() {
			oS.log( 'allElm' );
			$( 'body #addElmContainer' ).addClass( 'hidden' );
			$( 'body #allElmContainer' ).removeClass( 'hidden' );
			// window.location.href = 'custom/pages/allElm.html';
		} );

		// --- All elements Hide button
		$( '#allElmHide' ).off( 'click' ).on('click', function() {
			$( 'body #allElmContainer' ).addClass( 'hidden' );
		} );


		// --- Add elements 
		$( '#addElm' ).off( 'click' ).on( 'click', function() {
			oS.log( 'addElm' );
			$( 'body #allElmContainer' ).addClass( 'hidden' );
			$( 'body #addElmContainer' ).removeClass( 'hidden' );
		} );
		// --- Add elements Hide button
		$( '#addElmHide' ).off( 'click' ).on('click', function() {
			$( 'body #addElmContainer' ).addClass( 'hidden' );
		} );



		// --- edit or delete button events
		$( '.tableBody' ).off( 'click' ).on( 'click', function( e ) {
			// console.log( e.target.id );
			e.preventDefault();
			e.stopPropagation();
			if( e.target.id == 'edit' ) {
				editElement.call( oS, e );
			} else if ( e.target.id == 'delete' ) {
				deleteElement.call( oS, e );
			}
		} );


		// --- Add button in the Add elements
		$( '#addPropADD' ).off( 'click' ).on( 'click', function( e ) {
			oS.log( 'adding from add Element' );

			oS.oxidationIsotopesCount++;

			$( 'body #oxidationSateAdd' ).append( '<input type="text" class="form-control customOxidationInput" id="oxidationAdd_' + oS.oxidationIsotopesCount + '" placeholder="Oxidation of isotopes" ><button id="removeRow_' + oS.oxidationIsotopesCount + '" type="button" class="btn btn-danger oxiRemove" >Remove</button>' );

			// --- Oxidation row remove button
			$( 'body .oxiRemove' ).off( 'click' ).on( 'click', function( e ) {

				var Id = $( this ).attr( 'id' );
				// oS.oxidationIsotopesCount--;
				var toRemove = 'body #oxidationAdd_' + Id.split( '_' )[ 1 ];
				oS.log( toRemove );
				$( toRemove ).remove();
				$( this ).remove();

			} );

		} );

		// --- saveing data of the new Elements
		$( '#saveADD' ).off( 'click' ).on( 'click', function( e ) {


			addToDB.call( oS, true );
			return;
			var name = $( '#elementNameAdd' ).val();

			var oxiIsotopes = [];
			// var temp = $( '#' ).val()  oxidationAdd_0 from oxidationAdd_x
			for( var i = 0; i <= oS.oxidationIsotopesCount; i++ ) {

				if( $( '#oxidationAdd_' + i ).length > 0 ) {

					var oVal = $( '#oxidationAdd_' + i ).val().split( '|' );

					console.log( oVal );

					var saveObj = {
						"isotope": oVal[ 0 ],
						"atomic_mass": oVal[ 1 ],
						"natural_abundance": oVal[ 2 ],
						"half_life": oVal[ 3 ],
						"mode_of_decay": oVal[ 4 ],
					}

					oxiIsotopes.push( saveObj );

				}

			}

			var obj = {

				name: name,
				symbol: $( '#elementSymbolAdd' ).val(),
				stableState: $( '#stableStateAdd' ).val(),
				desc: $( '#elementDescAdd' ).val(),
				img_src: $( '#srcImageAdd' ).val(),
				discovery_date: $( '#discoveryDateAdd' ).val(),
				discovered_by: $( '#discoveredByAdd' ).val(),
				origin_of_name: $( '#nameOriginAdd' ).val(),
				elementColor: $( '#colorAdd' ).val(),
				electrons: $( '#electronAdd' ).val(),
				protons: $( '#protonAdd' ).val(),
				neutrons: $( '#neutronAdd' ).val(),
				relative_atomic_mass: $( '#atomicMassAdd' ).val(),
				atomic_number: $( '#atomicNumberAdd' ).val(),
				electron_radius: $( '#electronRadiusAdd' ).val(),
				covalent_radius: $( '#covalentRadiusAdd' ).val(),
				electron_affinity: $( '#electronAffinityAdd' ).val(),
				electron_negativity: $( '#electronNegativityAdd' ).val(),
				electron_config: $( '#electronConfigurationAdd' ).val(),
				boiling_point: $( '#boilingPointAdd' ).val(),
				melting_point: $( '#meltingPointAdd' ).val(),
				density: $( '#densityAdd' ).val(),
				
				group: $( '#GroupAdd' ).val(),
				period: $( '#PeriodAdd' ).val(),
				block: $("input[name='blocksRadio']:checked").val(),
				type: $("input[name='typesRadio']:checked").val(),
				state_at_20deg: $("input[name='statesRadio']:checked").val(),
				key_isotopes: $( '#isotopesAdd' ).val().split( ',' ),
				ionisation_energies: $( '#ionisationAdd' ).val().split( '|' ),

				oxidation_state: {
					
					common_oxidation_state: $( '#common_oxidation_stateAdd' ).val(),
					isotopes: oxiIsotopes
				},
				pressure_temprature: {
					specific_heat_capacity: $( '#specificHeatCapacityAdd' ).val(),
					youngs_modulus: $( '#youngsModulusAdd' ).val(),
					shear_modulus: $( '#shearModulusAdd' ).val(),
					bulk_modulus: $( '#bulkModulusAdd' ).val(),
					vapour_pressure: $( '#vapourPressureAdd' ).val().split( '|' ),
					// : $( '#' ).val()
				}
			}
			console.log( obj );
			firebase.database().ref('newElements/' + name ).set( obj );

		} );
	}

	function editElement( e ) {
		// console.log( e );
		var editingElm = $( e.target ).attr( 'data' ).trim(),
			markUp = '',
			showObj = oS.jsonData[ editingElm ];

		console.log( editingElm );

	    console.log( showObj );

		markUp += `
		<div class="editELmWrapper">
    		<div class="editELmContainer">
    			
    			<div class="editElmHeader">
    				<h3>Edit Elements</h3>
				</div>
	    		
	    		<div class="editElmBody">
    				
		    		<div class="row">
		    			
	    				<!-- Element Name -->
						<div class="form-group">
							<label for="exampleInputEmail1">1. Element Name</label>
							<input type="text" class="form-control" id="elementName" placeholder="Name of elment" value="` + showObj.name + `">
						</div>

						<!-- Element Symbol -->
						<div class="form-group">
							<label for="exampleInputEmail1">2. Element Symbol</label>
							<input type="text" class="form-control" id="elementSymbol" placeholder="Symbol of elment" value="` + showObj.symbol + `">
						</div>

						<!-- Stable State -->
						<div class="form-group">
							<label for="exampleInputEmail1">3. Stable State ( html )</label>
							<input type="text" class="form-control" id="stableState" placeholder="Stable State of element" value="` + showObj.stableState + `">
						</div>

						<!-- Description -->
						<div class="form-group">
							<label for="exampleInputEmail1">4. Description</label>
							<input type="text" class="form-control" id="elementDesc" placeholder="Description" value="` + showObj.desc + `">
						</div>

						<!-- Image Src -->
						<div class="form-group">
							<label for="exampleInputEmail1">5. Image Source</label>
							<input type="text" class="form-control" id="srcImage" placeholder="Image link" value="` + showObj.img_src + `">
						</div>

						<!-- Discovery Date / Year -->
						<div class="form-group">
							<label for="exampleInputEmail1">6. Discovery Date / Year</label>
							<input type="text" class="form-control" id="discoveryDate" placeholder="Discovery Date / Year" value="` + showObj.discovery_date + `">
						</div>

						<!-- Discovered By -->
						<div class="form-group">
							<label for="exampleInputEmail1">7. Discovered By</label>
							<input type="text" class="form-control" id="discoveredBy" placeholder="Discovered By" value="` + showObj.discovered_by + `">
						</div>

						
						<!-- Origin Name -->
						<div class="form-group">
							<label for="exampleInputEmail1">8. Origin of Name</label>
							<input type="text" class="form-control" id="nameOrigin" placeholder="Origin of Name" value="` + showObj.origin_of_name + `">
						</div>

						

						<!-- Color -->
						<div class="form-group">
							<label for="exampleInputEmail1">9. Color</label>
							<input type="text" class="form-control" id="color" placeholder="Color of element" value="` + showObj.elementColor + `">
						</div>

						<!-- Allotropes 

						Not Using

						<div class="form-group">
							<label for="exampleInputEmail1">10. Allotrope ( html )</label>
							<input type="text" class="form-control" id="allotrope_" placeholder="Allotrope of element" value="` + showObj.allotropes + `H<sub>2</sub>">
						</div> -->

						
						<!-- Number of electron -->
						<div class="form-group">
							<label for="exampleInputEmail1">10. Number of electon</label>
							<input type="number" class="form-control" id="electron" placeholder="Number of electon" value="` + showObj.electrons + `">
						</div>

						<!-- Number of proton -->
						<div class="form-group">
							<label for="exampleInputEmail1">11. Number of proton</label>
							<input type="number" class="form-control" id="proton" placeholder="Number of proton" value="` + showObj.protons + `">
						</div>

						<!-- Number of neutron -->
						<div class="form-group">
							<label for="exampleInputEmail1">12. Number of neutron</label>
							<input type="number" class="form-control" id="neutron" placeholder="Number of neutron" value="` + showObj.neutrons + `">
						</div>

						<!-- atomic mass -->
						<div class="form-group">
							<label for="exampleInputEmail1">13. Atomic mass</label>
							<input type="text" class="form-control" id="atomicMass" placeholder="Atomic mass of proton" value="` + showObj.relative_atomic_mass + `">
						</div>

						<!-- atomic number -->
						<div class="form-group">
							<label for="exampleInputEmail1">14. Atomic number</label>
							<input type="number" class="form-control" id="atomicNumber" placeholder="Atomic number" value="` + showObj.atomic_number + `">
						</div>

						<!-- electron radius -->
						<div class="form-group">
							<label for="exampleInputEmail1">15. Electron radius</label>
							<input type="text" class="form-control" id="electronRadius" placeholder="Electron radius" value="` + showObj.electron_radius + `">
						</div>

						<!-- Covalent radius -->
						<div class="form-group">
							<label for="exampleInputEmail1">16. Covalent Radius</label>
							<input type="number" class="form-control" id="covalentRadius" placeholder="Covalent Radius" value="` + showObj.covalent_radius + `">
						</div>

						<!-- electron affinity -->
						<div class="form-group">
							<label for="exampleInputEmail1">17. Electron Affinity</label>
							<input type="text" class="form-control" id="electronAffinity" placeholder="Electron Affinity" value="` + showObj.electron_affinity + `">
						</div>

						<!-- electron negativity -->
						<div class="form-group">
							<label for="exampleInputEmail1">18. Electron negativity</label>
							<input type="text" class="form-control" id="electronNegativity" placeholder="Electron Negativity" value="` + showObj.electron_negativity + `">
						</div>

						<!-- electron configuration -->
						<div class="form-group">
							<label for="exampleInputEmail1">19. Electron configuration</label>
							<input type="text" class="form-control" id="electronConfiguration" placeholder="Electron Configuration" value="` + showObj.electron_config + `">
						</div>

						<!-- boiling point -->
						<div class="form-group">
							<label for="exampleInputEmail1">20. Boiling Point</label>
							<input type="text" class="form-control" id="boilingPoint" placeholder="Boiling Point" value="` + showObj.boiling_point + `">
						</div>

						<!-- Melting point -->
						<div class="form-group">
							<label for="exampleInputEmail1">21. Melting Point</label>
							<input type="text" class="form-control" id="meltingPoint" placeholder="Melting Point" value="` + showObj.melting_point + `">
						</div>


						<!-- Density -->
						<div class="form-group">
							<label for="exampleInputEmail1">22. Density</label>
							<input type="text" class="form-control" id="density" placeholder="Density" value="` + showObj.density + `">
						</div>


						<!-- Isotopes -->
						<div class="form-group">
							<label for="exampleInputEmail1">23. Key Isotopes</label>
							<input type="text" class="form-control" id="isotopes" placeholder="Isotopes" value="` + showObj.key_isotopes.join( '|' ) + `">
						</div>

						<!-- Ionisation -->
						<div class="form-group">
							<label for="exampleInputEmail1">24. Ionisation ( 8 values )</label>
							<input type="text" class="form-control" id="ionisation" placeholder="Ionisation" value="` + showObj.ionisation_energies.join( '|' ) + `">
						</div>

						<!-- Specific Heat Capacity specific_heat_capacity -->
						<div class="form-group">
							<label for="exampleInputEmail1">25. Specific Heat Capacity </label>
							<input type="text" class="form-control" id="specificHeatCapacity" placeholder="Specific Heat Capacity" value="` + showObj.pressure_temprature.specific_heat_capacity + `">
						</div>

						<!-- Youngs Modulus youngs_modulus -->
						<div class="form-group">
							<label for="exampleInputEmail1">26. Youngs Modulus </label>
							<input type="text" class="form-control" id="youngsModulus" placeholder="Youngs Modulus" value="` + showObj.pressure_temprature.youngs_modulus + `">
						</div>

						<!-- Shear Modulus shear_modulus -->
						<div class="form-group">
							<label for="exampleInputEmail1">27. Shear Modulus </label>
							<input type="text" class="form-control" id="shearModulus" placeholder="Shear Modulus" value="` + showObj.pressure_temprature.shear_modulus + `">
						</div>

						<!-- Bulk Modulus bulk_modulus -->
						<div class="form-group">
							<label for="exampleInputEmail1">28. Bulk Modulus </label>
							<input type="text" class="form-control" id="bulkModulus" placeholder="Bulk Modulus" value="` + showObj.pressure_temprature.bulk_modulus + `">
						</div>


						<!-- Vapour Pressure vapour_pressure -->
						<div class="form-group">
							<label for="exampleInputEmail1">29. Vapour Pressure ( 11. values ) </label>
							<input type="text" class="form-control" id="vapourPressure" placeholder="Vapour Pressure" value="` + showObj.pressure_temprature.vapour_pressure.join( '|' ) + `">
						</div>


						<!-- Common Oxidation State   common_oxidation_state-->
						<div class="form-group">
							<label for="exampleInputEmail1">30. Common Oxidation State</label>
							<input type="text" class="form-control" id="common_oxidation_state" placeholder="Common Oxidation State" value="` + showObj.oxidation_state.common_oxidation_state + `">

						</div>`;


					// ---- adding oxidation properties of the isotopes
					markUp += `

						<!-- Ionisation -->
						<div class="form-group" id="oxidationSate">
							<label for="exampleInputEmail1">31. Oxidation state of the Isotopes</label>
							`

							oS.oxidationIsotopesCount = 0;
							for( var i in showObj.oxidation_state.isotopes ) {

								oS.oxidationIsotopesCount++;

								var tempData = showObj.oxidation_state.isotopes[ i ];

								var sValue = tempData.isotope + '|' + tempData.atomic_mass + '|' + tempData.natural_abundance + '|' + tempData.half_life + '|' + tempData.mode_of_decay;

								markUp += '<input type="text" class="form-control" id="oxidation_' + i + '" placeholder="Oxidation of isotopes" value=" ' + sValue + ' "><br />';

							}
							


							markUp += `<button id="addProp" type="button" class="btn btn-primary" style="float: right;">Add Row</button><br /><br />
						</div>
					`;
					// ---- oxidation properties of the isotopes Ends here

					// ------ adding Group
					markUp += `

						<div class="form-group">
							<label for="sel1">32. Group of Element</label>
							<select class="form-control" id="Group" >`;

								for( var i = 1; i <= 18; i++ ) {

									if( i == Number( showObj.group ) )
										markUp += '<option selected>' + i + '</option>'
									else
										markUp += '<option>' + i + '</option>'

								}

								markUp += `

							</select>
						</div>
					`;
					// ------ Group ends here

					// ------ Period starts here

					markUp += `

						<div class="form-group">
							<label for="sel1">33. Period of Element</label>
							<select class="form-control" id="Period" >`;

							for( var i = 1; i <= 7; i++ ) {

									if( i == showObj.period )
										markUp += '<option selected>' + i + '</option>'
									else
										markUp += '<option>' + i + '</option>'

								}


								if( showObj.period == 'Lathanides' )
									markUp += '<option selected>Lathanides</option>';
								else
									markUp += '<option>Lathanides</option>';

								if( showObj.period == 'Actinides' )
									markUp += '<option selected>Actinides</option>';
								else
									markUp += '<option>Actinides</option>';


								markUp += `

							</select>
						</div>
					`;
					// ------ Period ends here

					// ---- Blocks code starts here
					markUp += `
						<!-- Blocks -->
						<div>
							<label for="exampleInputEmail1">34. Blocks</label>
							<br />`

							var blockArr = [ 's', 'p', 'd', 'f' ];
							for( var i in blockArr ) {

								markUp += '<label class="radio-inline">';

								if( blockArr[ i ] == showObj.block )
									markUp += '<input type="radio" value="' + blockArr[ i ] + '" name="blocksRadio" checked>' + blockArr[ i ];
								else
									markUp += '<input type="radio" value="' + blockArr[ i ] + '" name="blocksRadio">' + blockArr[ i ];

								markUp += '</label>';

							}

						markUp += `
						</div>
					`;
					// ---- Blocks code ends here



					// ------ Types codes starts here
					markUp += `
						<!-- Types of elements -->
						<br />
						<div>
							<label for="exampleInputEmail1">35. Types of Elements</label>
							<br />`

							var typeskArr = [ 'Metals', 'Non-Metals' ];
							for( var i in typeskArr ) {

								markUp += '<label class="radio-inline">';

								if( typeskArr[ i ].toLowerCase() == showObj.type.toLowerCase() )
									markUp += '<input type="radio" value="' + typeskArr[ i ] + '" name="typesRadio" checked>' + typeskArr[ i ];
								else
									markUp += '<input type="radio" value="' + typeskArr[ i ] + '" name="typesRadio">' + typeskArr[ i ];

								markUp += '</label>';

							}

						markUp += `
						</div>
					`;
					// ------ Types codes ends here

					// ---- State code starts here
					markUp += `
						<!-- Blocks -->
						<br />
						<div>
							<label for="exampleInputEmail1">36. State at 20 deg</label>
							<br />`

							var stateskArr = [ 'Solid', 'Liquid', 'Gas' ];
							for( var i in stateskArr ) {

								markUp += '<label class="radio-inline">';

								if( stateskArr[ i ].toLowerCase() == showObj.state_at_20deg.toLowerCase() )
									markUp += '<input type="radio" value="' + stateskArr[ i ] + '" name="statesRadio" checked>' + stateskArr[ i ];
								else
									markUp += '<input type="radio" value="' + stateskArr[ i ] + '" name="statesRadio">' + stateskArr[ i ];

								markUp += '</label>';

							}

						markUp += `
						</div>
					`;
					// ---- State code ends here

		markUp += `
					</div>

	    		</div>
	    		
	    		<div  class="editElmFooter">
	    			<div style="float: right">
	    				<button id="editElmSave" type="button" class="btn btn-primary">Save</button>
	    				<button id="editElmClose" type="button" class="btn btn-danger">Close</button>
	    			</div>	
	    		</div>

    		</div>
    	</div>
		`;

		$( 'body' ).append( markUp );
		// addEvents.call( oS );

		$( 'body #editElmSave' ).off( 'click' ).on( 'click', function ( e ) {
			addToDB.call( oS, false );
			$( '.editELmWrapper' ).remove();
		} );

		// --- edit elements close button
		$( 'body #editElmClose' ).off( 'click' ).on( 'click', function( e ) {
			console.log( 'closing..' );
			$( '.editELmWrapper' ).remove();
		} );

		// --- Adding the row of the Oxidation state
		$( 'body #addProp' ).off( 'click' ).on( 'click', function ( e ) {
			oS.log( 'adding Row.' );
			oS.oxidationIsotopesCount++;

			$( 'body #oxidationSate' ).append( '<input type="text" class="form-control customOxidationInput" id="oxidation_' + oS.oxidationIsotopesCount + '" placeholder="Oxidation of isotopes" ><button id="removeRow_' + oS.oxidationIsotopesCount + '" type="button" class="btn btn-danger oxiRemove" >Remove</button>' );

			// --- Oxidation row remove button
			$( 'body .oxiRemove' ).off( 'click' ).on( 'click', function( e ) {

				var Id = $( this ).attr( 'id' );
				// oS.oxidationIsotopesCount--;
				var toRemove = 'body #oxidation_' + Id.split( '_' )[ 1 ];
				oS.log( toRemove );
				$( toRemove ).remove();
				$( this ).remove();

			} );
		} );
	}

	function addToDB( bIsAdd ) {
		
		var str = ( bIsAdd ) ? 'Add' : '';

		var name = $( '#elementName' + str ).val();

		var oxiIsotopes = [];
		// var temp = $( '#' ).val()  oxidationAdd_0 from oxidationAdd_x
		var bForCond;
		if( bIsAdd ) {
			bForCond = oS.oxidationIsotopesCount;
		} else {
			bForCond = oS.jsonData[ name ].oxidation_state.isotopes.length;
		}
		for( var i = 0; i <= bForCond; i++ ) {

			var bCond;
			if( bIsAdd ) {
				bCond = $( '#oxidationAdd_' + i )
			} else {
				bCond = $( '#oxidation_' + i )
			}
			if( bCond.length > 0 ) {

				var oVal = bCond.val().split( '|' );
				var saveObj = {
					"isotope": oVal[ 0 ],
					"atomic_mass": oVal[ 1 ],
					"natural_abundance": oVal[ 2 ],
					"half_life": oVal[ 3 ],
					"mode_of_decay": oVal[ 4 ],
				}

				oxiIsotopes.push( saveObj );

			}

		}

		var obj = {

			name: name,
			symbol: $( '#elementSymbol' + str ).val(),
			stableState: $( '#stableState' + str ).val(),
			desc: $( '#elementDesc' + str ).val(),
			img_src: $( '#srcImage' + str ).val(),
			discovery_date: $( '#discoveryDate' + str ).val(),
			discovered_by: $( '#discoveredBy' + str ).val(),
			origin_of_name: $( '#nameOrigin' + str ).val(),
			elementColor: $( '#color' + str ).val(),
			electrons: $( '#electron' + str ).val(),
			protons: $( '#proton' + str ).val(),
			neutrons: $( '#neutron' + str ).val(),
			relative_atomic_mass: $( '#atomicMass' + str ).val(),
			atomic_number: $( '#atomicNumber' + str ).val(),
			electron_radius: $( '#electronRadius' + str ).val(),
			covalent_radius: $( '#covalentRadius' + str ).val(),
			electron_affinity: $( '#electronAffinity' + str ).val(),
			electron_negativity: $( '#electronNegativity' + str ).val(),
			electron_config: $( '#electronConfiguration' + str ).val(),
			boiling_point: $( '#boilingPoint' + str ).val(),
			melting_point: $( '#meltingPoint' + str ).val(),
			density: $( '#density' + str ).val(),
			
			group: $( '#Group' + str ).val(),
			period: $( '#Period' + str ).val(),
			block: $("input[name='blocksRadio']:checked").val(),
			type: $("input[name='typesRadio']:checked").val(),
			state_at_20deg: $("input[name='statesRadio']:checked").val(),
			key_isotopes: $( '#isotopes' + str ).val().split( '|' ),
			ionisation_energies: $( '#ionisation' + str ).val().split( '|' ),

			oxidation_state: {
				
				common_oxidation_state: $( '#common_oxidation_state' + str ).val(),
				isotopes: oxiIsotopes
			},
			pressure_temprature: {
				specific_heat_capacity: $( '#specificHeatCapacity' + str ).val(),
				youngs_modulus: $( '#youngsModulus' + str ).val(),
				shear_modulus: $( '#shearModulus' + str ).val(),
				bulk_modulus: $( '#bulkModulus' + str ).val(),
				vapour_pressure: $( '#vapourPressure' + str ).val().split( '|' ),
				// : $( '#' ).val()
			}
		}
		
		console.log( obj );
		firebase.database().ref('newElements/' + name ).set( obj );

		firebaseManage.call( oS );
		$( '#allElm' ).trigger( 'click' );
	}

	// --- delete the elements
	function deleteElement( e ) {
		
		var editingElm = $( e.target ).attr( 'data' ).trim();
		console.log( 'deleting ' + editingElm );
		firebase.database().ref('newElements/' + editingElm ).remove();

		firebaseManage.call( oS );
	}


	// --- loader
	function toggleLoader( bool ) {
		
		if( bool )
			$( '#loader' ).show();
		else
			$( '#loader' ).hide();

	}

	// ---- adding properties to oS
	oS.log = function ( text, bg, color ) {
		
		var _bg = ( bg ) ? bg : '#000',
			_color = ( color ) ? color : '#FFF';

		console.log( '%c ' + text + ' ', 'background: ' + _bg +'; color: ' + _color );

	};

	oS.logData = function ( data ) {
		console.log( logData );
	}

}() );