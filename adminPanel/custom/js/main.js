/*
* @Author: mujibur
* @Date:   2017-03-17 19:04:15
* @Last Modified by:   mujibur
* @Last Modified time: 2017-03-20 19:34:05
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


		var allElementsRef = database.ref('elements/');
		allElementsRef.on('value', function(snapshot) {
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

			var markUp = '<tr><th scope="row"> ' + nCount + ' </th><td> ' + i + ' </td><td> ' + tempData.Symbol + ' </td><td><button id="edit" type="button" class="btn btn-warning" data=" ' + i + ' " data-toggle="modal" data-target="#myModal" >Edit</button></td><td><button id="delete" type="button" class="btn btn-danger" data=" ' + i + ' " >Delete</button></td></tr>'
			// console.log( i );
			target.append( markUp );

		}

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
			// console.log( e.target.id );
			e.preventDefault();
			e.stopPropagation();
			if( e.target.id == 'edit' ) {
				editElement.call( oScope, e );
			} else if ( e.target.id == 'delete' ) {
				deleteElement.call( oScope, e );
			}

		} );
	}

	function editElement( e ) {
		// console.log( e );
		var editingElm = $( e.target ).attr( 'data' ).trim(),
			markUp = '',
			showObj = oScope.jsonData[ editingElm ];

		console.log( editingElm );
		

		showObj = {
	        "name": "Hydrogen",
	        "symbol": "H",
	        "stableState": "H<sub>2</sub>",
	        "desc": " description gonna come ",
	        "img_src": "http://sod-a.rsc-cdn.org/www.rsc.org/periodic-table/content/Images/Elements/Hydrogen-L.jpg?6.0.3.0",
	        "discovery_date": "1766",
	        "discovered_by": "Henry Cavendish",
	        "origin_of_name": "The name is derived from the Greek 'hydro' and 'genes' meaning water forming. ",
	        "group": "1",
	        "period": "1",
	        "block": "s",
	        "type": "NON-METALS",
	        "state_at_20deg": "Gas",
	        "melting_point": "−259.16°C, −434.49°F, 13.99 K",
	        "boiling_point": "−252.879°C, −423.182°F, 20.271 K ",
	        "density": "0.000082",
	        "allotropes": "H<sub>2</sub>",
	        "protons": 1,
	        "neutrons": 1,
	        "electrons": 1,
	        "relative_atomic_mass": "1.00794",
	        "atomic_number": "1",
	        "electron_radius": "1.10",
	        "covalent_radius": "0.32",
	        "electron_affinity": "72.769",
	        "electron_negativity": "2.20",
	        "electron_config": "1s<sup>1</sup>",
	        "key_isotopes": [
	            "1<sup></sup>H",
	            "2<sup></sup>H"
	        ],
	        "ionisation_energies": [
	            "1312.05",
	            "-",
	            "-",
	            "-",
	            "-",
	            "-",
	            "-",
	            "-"
	        ],
	        "oxidation_state": {
	            "common_oxidation_state": "1, -1",
	            "isotopes": {
	                "0": {
	                    "isotope": "<sup>1</sup>H",
	                    "atomic_mass": "1.008",
	                    "natural_abundance": "99.9885",
	                    "half_life": "-",
	                    "mode_of_decay": "-"
	                },
	                "1": {
	                    "isotope": "<sup>2</sup>H",
	                    "atomic_mass": "2.014",
	                    "natural_abundance": "0.0115",
	                    "half_life": "-",
	                    "mode_of_decay": "-"
	                },
	                "2": {
	                    "isotope": "<sup>3</sup>H",
	                    "atomic_mass": "3.016",
	                    "natural_abundance": "-",
	                    "half_life": "12.31 years",
	                    "mode_of_decay": "beta-"
	                }
	            }
	        },
	        "pressure_temprature": {
	            "specific_heat_capacity": "14304",
	            "youngs_modulus": "-",
	            "shear_modulus": "-",
	            "bulk_modulus": "-",
	            "vapour_pressure": {
	                "400": "-",
	                "600": "-",
	                "800": "-",
	                "1000": "-",
	                "1200": "-",
	                "1400": "-",
	                "1600": "-",
	                "1800": "-",
	                "2000": "-",
	                "2200": "-",
	                "2400": "-"
	            }
	        },
	        "AtomicRadius": 0.25,
	        "ElementColor": "rgb(235,235,235)"
	    }

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

						<!-- Allotrope -->
						<div class="form-group">
							<label for="exampleInputEmail1">2. Allotrope ( html )</label>
							<input type="text" class="form-control" id="allotrope" placeholder="Allotrope of element" value="` + showObj.stableState + `">
						</div>

						<!-- Description -->
						<div class="form-group">
							<label for="exampleInputEmail1">3. Description</label>
							<input type="text" class="form-control" id="elementDesc" placeholder="Description" value="` + showObj.desc + `">
						</div>

						<!-- Inventor -->
						<div class="form-group">
							<label for="exampleInputEmail1">4. Inventor</label>
							<input type="text" class="form-control" id="inventor" placeholder="Inventor of element" value="` + showObj.discovered_by + `">
						</div>

						<!-- Invention Year -->
						<div class="form-group">
							<label for="exampleInputEmail1">5. Invention Year</label>
							<input type="number" class="form-control" id="inventionYear" placeholder="Invention Year of element" value="` + showObj.discovery_date + `">
						</div>

						<!-- Origin Name -->
						<div class="form-group">
							<label for="exampleInputEmail1">6. Origin of Name</label>
							<input type="text" class="form-control" id="nameOrigin" placeholder="Origin of Name" value="` + showObj.origin_of_name + `">
						</div>

						<!-- Group -->
						<div class="dropup">
							<label>7. Group of Element</label>
							<br />
							<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Group of Element
								<span class="caret"></span>
							</button>
							
							<ul class="dropdown-menu scrollable-menu">
								<li> 1 </li>
								<li> 2 </li>
								<li> 3 </li>
								<li> 4 </li>
								<li> 5 </li>
								<li> 6 </li>
								<li> 7 </li>
								<li> 8 </li>
								<li> 9 </li>
								<li> 10 </li>
								<li> 11 </li>
								<li> 12 </li>
								<li> 13 </li>
								<li> 14 </li>
								<li> 15 </li>
								<li> 16 </li>
								<li> 17 </li>
								<li> 18 </li>
								
							</ul>
						</div>

						<!-- Blocks -->
						<div>
							<label for="exampleInputEmail1">8. Blocks</label>
							<br />
							<label class="radio-inline">
								<input type="radio" name="optradio">s
							</label>
							<label class="radio-inline">
								<input type="radio" name="optradio">p
							</label>
							<label class="radio-inline">
								<input type="radio" name="optradio">d
							</label>
							<label class="radio-inline">
								<input type="radio" name="optradio">f
							</label>
						</div>

						<!-- Period -->
						<div class="dropup">
							<label>9. Period of Element</label>
							<br />
							<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Period of Element
								<span class="caret"></span>
							</button>
							
							<ul class="dropdown-menu scrollable-menu">
								<li> 1 </li>
								<li> 2 </li>
								<li> 3 </li>
								<li> 4 </li>
								<li> 5 </li>
								<li> 6 </li>
								<li> 7 </li>
								<li> Lathanides </li>
								<li> Actinides </li>
							</ul>
						</div>

						<!-- Types -->
						<div>
							<label for="exampleInputEmail1">10. Types</label>
							<br />
							<label class="radio-inline">
								<input type="radio" name="optradio">Metals
							</label>
							<label class="radio-inline">
								<input type="radio" name="optradio">Non-Metals
							</label>
						</div>

						<!-- Color -->
						<div class="form-group">
							<label for="exampleInputEmail1">11. Color</label>
							<input type="text" class="form-control" id="color" placeholder="Color of element" value="` + showObj.ElementColor + `">
						</div>

						<!-- Allotropes -->
						<div class="form-group">
							<label for="exampleInputEmail1">12. Allotrope ( html )</label>
							<input type="text" class="form-control" id="allotrope_" placeholder="Allotrope of element" value="` + showObj.allotropes + `H<sub>2</sub>">
						</div>

						<!-- states -->
						<div>
							<label for="exampleInputEmail1">13. State at 20&deg;</label>
							<br />
							<label class="radio-inline">
								<input type="radio" name="optradio">Gas
							</label>
							<label class="radio-inline">
								<input type="radio" name="optradio">Solid
							</label>
							<label class="radio-inline">
								<input type="radio" name="optradio">Liquid
							</label>
						</div>

						<!-- Number of electron -->
						<div class="form-group">
							<label for="exampleInputEmail1">14. Number of electon</label>
							<input type="number" class="form-control" id="electron" placeholder="Number of electon" value="` + showObj.electrons + `">
						</div>

						<!-- Number of proton -->
						<div class="form-group">
							<label for="exampleInputEmail1">15. Number of proton</label>
							<input type="number" class="form-control" id="proton" placeholder="Number of proton" value="` + showObj.protons + `">
						</div>

						<!-- Number of neutron -->
						<div class="form-group">
							<label for="exampleInputEmail1">16. Number of neutron</label>
							<input type="number" class="form-control" id="neutron" placeholder="Number of neutron" value="` + showObj.neutrons + `">
						</div>

						<!-- Number of atomic mass -->
						<div class="form-group">
							<label for="exampleInputEmail1">17. Atomic mass</label>
							<input type="number" class="form-control" id="atomicMass" placeholder="Atomic mass of proton" value="` + showObj.relative_atomic_mass + `">
						</div>

						<!-- Number of atomic number -->
						<div class="form-group">
							<label for="exampleInputEmail1">18. Atomic number</label>
							<input type="number" class="form-control" id="atomicNumber" placeholder="Atomic number" value="` + showObj.atomic_number + `">
						</div>

						<!-- Number of electron radius -->
						<div class="form-group">
							<label for="exampleInputEmail1">19. Electron radius</label>
							<input type="number" class="form-control" id="electronRadius" placeholder="Electron radius" value="` + showObj.electron_radius + `">
						</div>

						<!-- Number of electron radius -->
						<div class="form-group">
							<label for="exampleInputEmail1">20. Covalent Radius</label>
							<input type="number" class="form-control" id="covalentRadius" placeholder="Covalent Radius" value="` + showObj.covalent_radius + `">
						</div>

						<!-- electron affinity -->
						<div class="form-group">
							<label for="exampleInputEmail1">21. Electron Affinity</label>
							<input type="number" class="form-control" id="electronAffinity" placeholder="Electron Affinity" value="` + showObj.electron_affinity + `">
						</div>

						<!-- electron negativity -->
						<div class="form-group">
							<label for="exampleInputEmail1">22. Electron negativity</label>
							<input type="number" class="form-control" id="electronNegativity" placeholder="Electron Negativity" value="` + showObj.electron_negativity + `">
						</div>

						<!-- electron configuration -->
						<div class="form-group">
							<label for="exampleInputEmail1">23. Electron configuration</label>
							<input type="text" class="form-control" id="electronConfiguration" placeholder="Electron Configuration" value="` + showObj.electron_config + `1s<sup>1</sup>">
						</div>

						<!-- boiling point -->
						<div class="form-group">
							<label for="exampleInputEmail1">24. Boiling Point</label>
							<input type="text" class="form-control" id="boilingPoint" placeholder="Boiling Point" value="` + showObj.boiling_point + `">
						</div>

						<!-- Melting point -->
						<div class="form-group">
							<label for="exampleInputEmail1">25. Melting Point</label>
							<input type="text" class="form-control" id="meltingPoint" placeholder="Melting Point" value="` + showObj.melting_point + `">
						</div>

						<!-- Isotopes -->
						<div class="form-group">
							<label for="exampleInputEmail1">26. Key Isotopes</label>
							<input type="text" class="form-control" id="isotopes" placeholder="Isotopes" value="` + showObj.isotopes + `<sup>1</sup>H, <sup>2</sup>H">
						</div>

						<!-- Ionisation -->
						<div class="form-group">
							<label for="exampleInputEmail1">27. Ionisation</label>
							<input type="text" class="form-control" id="ionisation" placeholder="Ionisation" value="` + showObj.ionisation_energies.join( ',' ) + `1312.05, -, -, -, -, -, -, -">
						</div>

						<!-- Ionisation -->
						<div class="form-group" id="oxidationSate">
							<label for="exampleInputEmail1">28. Oxidation</label>
							<input type="text" class="form-control" id="oxidation" placeholder="Oxidation" value="` + showObj.oxidation + `<sup>1</sup>H, 1.008, 99.9885, -, -">

							<button id="addProp" type="button" class="btn btn-primary" style="float: right;">Add Row</button>
						</div>
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
		// addEvents.call( oScope );

		$( 'body #editElmClose' ).off( 'click' ).on( 'click', function( e ) {
			console.log( 'closing..' );
			$( '.editELmWrapper' ).remove();

		} );

	}

	function deleteElement( e ) {
		console.log( e );
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