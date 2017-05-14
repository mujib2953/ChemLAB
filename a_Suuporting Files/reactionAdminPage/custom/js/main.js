/*
* @Author: Mujib Ansari
* @Date:   2017-05-13 14:06:53
* @Last Modified by:   Mujib Ansari
* @Last Modified time: 2017-05-14 20:51:29
*/

'use strict';

( function() {
	var oScope = {
		nElmCount: 0
	};
	$( document ).ready( function(){
		console.log( JSON.parse( '{"Ag2S":{"elms":"Ag,Ag,S"},"AgBr":{"elms":"Ag,Br"},"AgCl":{"elms":"Ag,Cl"},"AgI":{"elms":"Ag,I"},"AgN3":{"elms":"Ag,N2,N"},"AgO":{"elms":"Ag,O"},"AgONC":{"elms":"Ag,O,N,C"},"Al2O3":{"elms":"Al,Al,O3"},"AlAs":{"elms":"Al,As"},"AlCl3":{"elms":"Al,Cl2,Cl"},"AlF3":{"elms":"Al,F2,F"},"AlN":{"elms":"Al,N"},"AlSb":{"elms":"Al,Sb"},"AlSc":{"elms":"Al,Sc"},"AmCl2":{"elms":"Am,Cl2"},"AmCl3":{"elms":"Am,Cl2,Cl"},"AmF3":{"elms":"Am,F2,F"},"AmF4":{"elms":"Am,F2,F2"},"AuCl":{"elms":"Au,Cl"},"AuF3":{"elms":"Au,F2,F"},"B2H6":{"elms":"B,B,H2,H2,H2"},"B2O3":{"elms":"B,B,O3"},"B4C":{"elms":"B,B,B,B,C"},"BaCl2":{"elms":"Ba,Cl2"},"BaF2":{"elms":"Ba,F2"},"BaSO4":{"elms":"Ba,S,O3,O"},"BaTiO3":{"elms":"Ba,Ti,O3"},"BCl3":{"elms":"B,Cl2,Cl"},"BeH2":{"elms":"Be,H2"},"BeO":{"elms":"Be,O"},"Bi2O3":{"elms":"Bi,Bi,O3"},"BiOCl":{"elms":"Bi,O,Cl"},"Bk2O3":{"elms":"Bk,Bk,O3"},"BkCl3":{"elms":"Bk,Cl2,Cl"},"BkF3":{"elms":"Bk,F2,F"},"BkF4":{"elms":"Bk,F2,F2"},"BkI3":{"elms":"Bk,I2,I"},"BkO":{"elms":"Bk,O"},"BkO2":{"elms":"Bk,O2"},"Br2":{"elms":"Br,Br"},"BN":{"elms":"B,N"},"CBr4":{"elms":"C,Br2,Br2"},"CCl4":{"elms":"C,Cl2,Cl2"},"CF4":{"elms":"C,F2,F2"},"CHClF2":{"elms":"C,H,Cl,F2"},"CH4":{"elms":"C,H2,H2"},"CO":{"elms":"C,O"},"COS":{"elms":"C,O,S"},"CO2":{"elms":"C,O2"},"C2H2":{"elms":"C,C,H2"},"C2H4O":{"elms":"C,C,H2,H2,O"},"C2H4O2":{"elms":"C,C,H2,H2,O2"},"C2H6O":{"elms":"C,C,H2,H2,H2,O"},"C2H6O2":{"elms":"C,C,H2,H2,H2,O2"},"C3H5N3O9":{"elms":"C,C,C,H2,H2,H,N2,N,O3,O3,O3"},"C3H8O":{"elms":"C,C,C,H2,H2,H2,H2,O"},"C4H10":{"elms":"C,C,C,C,H2,H2,H2,H2,H2"},"C6H6":{"elms":"C,C,C,C,C,C,H2,H2,H2"},"C6H8O6":{"elms":"C,C,C,C,C,C,H2,H2,H2,H2,O3,O3"},"C6H12O6":{"elms":"C,C,C,C,C,C,H2,H2,H2,H2,H2,H2,O3,O3"},"C6H15B":{"elms":"C,C,C,C,C,C,H2,H2,H2,H2,H2,H2,H2,H,B"},"C7H5N3O6":{"elms":"C,C,C,C,C,C,C,H2,H2,H,N2,N,O3,O3"},"C7HN4O2":{"elms":"C,C,C,C,C,C,C,H,N2,N2,O2"},"C8H10N4O2":{"elms":"C,C,C,C,C,C,C,C,H2,H2,H2,H2,H2,N2,N2,O2"},"C9H8O4":{"elms":"C,C,H2,H2,H2,H2,O3,O"},"C12H22O11":{"elms":"C,C,C,C,C,C,C,C,C,C,C,C,H2,H2,H2,H2,H2,H2,H2,H2,H2,H2,H2,O3,O3,O3,O2"},"C20H24N2O2":{"elms":"C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,H2,H2,H2,H2,H2,H2,H2,H2,H2,H2,H2,H2,N2,O2"},"CaB6":{"elms":"Ca,B,B,B,B,B,B"},"CaCl2":{"elms":"Ca,Cl2"},"CaCrO4":{"elms":"Ca,Cr,O3,O"},"CaF2":{"elms":"Ca,F2"},"CaH2":{"elms":"Ca,H2"},"CaI2":{"elms":"Ca,I2"},"CaO":{"elms":"Ca,O"},"CaO2":{"elms":"Ca,O2"},"CaP2":{"elms":"Ca,P,P"},"CaSO4":{"elms":"Ca,S,O2,O2"},"CaWO4":{"elms":"Ca,W,O3,O"},"CdO":{"elms":"Cd,O"},"CdS":{"elms":"Cd,S"},"CdSe":{"elms":"Cd,Se"},"CdTe":{"elms":"Cd,Te"},"CeO2":{"elms":"Ce,O2"},"ClO2":{"elms":"Cl,O2"},"Cl2":{"elms":"Cl,Cl"},"CoAl2O4":{"elms":"Co,Al2,O2,O2"},"CoCl2":{"elms":"Co,Cl2"},"CoCrMo":{"elms":"Ca,Cr,Mo"},"CoO3Sn":{"elms":"Co,O3,Sn"},"CoPhO2":{"elms":"Co,Ph,O2"},"Cr2O3":{"elms":"Cr,Cr,O3"},"CrO2":{"elms":"Cr,O2"},"CrO3":{"elms":"Cr,O3"},"CsCl2":{"elms":"Cs,Cl2"},"CuCO3":{"elms":"Cu,C,O3"},"CuI":{"elms":"Cu,I"},"CuO":{"elms":"Cu,O"},"CuSO5":{"elms":"Cu,S,O5"},"DyOF2":{"elms":"Dy,O,F2"},"Er2O3":{"elms":"Er,Er,O3"},"Eu2O":{"elms":"Eu,Eu,O"},"F2":{"elms":"F,F"},"FeCl2":{"elms":"Fe,Cl,Cl"},"FeO":{"elms":"Fe,O"},"FeS2":{"elms":"Fe,S,S"},"FeV":{"elms":"Fe,V"},"Fe2O3":{"elms":"Fe,Fe,O3"},"Fe3O4":{"elms":"Fe,Fe,Fe,O2,O2"},"GaAs":{"elms":"Ga,As"},"GaInP":{"elms":"Ga,In,P"},"Gd2O3":{"elms":"Gd,Gd,O3"},"GeO2":{"elms":"Ge,O2"},"HCl":{"elms":"H,Cl"},"HF":{"elms":"H,F"},"HNO3":{"elms":"H,N,O3"},"HN3":{"elms":"H,N,N2"},"H2":{"elms":"H,H"},"H2O":{"elms":"H2,O"},"H2O2":{"elms":"H2,O2"},"H2S":{"elms":"H2,S"},"H3BO3":{"elms":"H2,H,B,O3"},"HgS":{"elms":"Hg,S"},"HoO3H3":{"elms":"Ho,O3,H2,H"},"I2":{"elms":"I,I"},"In2GaN2":{"elms":"In,In,Ga,N2"},"In2O3":{"elms":"In,In,O3"},"IrOs":{"elms":"Ir,Os"},"KBr":{"elms":"K,Br"},"KCl":{"elms":"K,Cl"},"KClO3":{"elms":"K,Cl,O3"},"KClO4":{"elms":"K,Cl,O2,O2"},"KHCO3":{"elms":"K,H,C,O3"},"KI":{"elms":"K,I"},"KNO3":{"elms":"K,N,O3"},"KOH":{"elms":"K,O,H"},"KrAr":{"elms":"Kr,Ar"},"KrF":{"elms":"Kr,F"},"La2O3":{"elms":"La,La,O3"},"LiAlH4":{"elms":"Li,Al,H2,H2"},"LiBr":{"elms":"Li,Br"},"LiCoO2":{"elms":"Li,Co,O2"},"LiH":{"elms":"Li,H"},"LiI":{"elms":"Li,I"},"LiNO3":{"elms":"Li,N,O3"},"Li2CO3":{"elms":"Li,Li,C,O3"},"Li2SO4":{"elms":"Li,Li,S,O2,O2"},"Li3N":{"elms":"Li,Li,Li,N"},"Lu2O3":{"elms":"Lu,Lu,O3"},"MgAl":{"elms":"Mg,Al"},"MgAlO4":{"elms":"Mg,Al,O2,O2"},"MgB2":{"elms":"Mg,B,B"},"MgBr2":{"elms":"Mg,Br2"},"MgCl2":{"elms":"Mg,Cl2"},"MgO":{"elms":"Mg,O"},"MgO2H2":{"elms":"Mg,O2,H2"},"MgSO4":{"elms":"Mg,S,O3,O"},"MnO2":{"elms":"Mn,O2"},"MoS2":{"elms":"Mo,S,S"},"MoSi2":{"elms":"Mo,Si,Si"},"NH3":{"elms":"N,H2,H"},"NH4TcO4":{"elms":"N,H2,H2,Tc,O3,O"},"NI3":{"elms":"N,I2,I"},"NO":{"elms":"N,O"},"NO2":{"elms":"N,O2"},"N2":{"elms":"N,N"},"N2H4":{"elms":"N2,H2,H2"},"N2O":{"elms":"N2,O"},"NaBr":{"elms":"Na,Br"},"NaCl":{"elms":"Na,Cl"},"NaF":{"elms":"Na,F"},"NaH":{"elms":"Na,H"},"NaI":{"elms":"Na,I"},"NaNO3":{"elms":"Na,N,O3"},"NaN3":{"elms":"Na,N2,N"},"NaOH":{"elms":"Na,O,H"},"Na2CO3":{"elms":"Na,Na,C,O3"},"Na2O2":{"elms":"Na,Na,O2"},"Na2SO4":{"elms":"Na,Na,S,O2,O2"},"Na3PO4":{"elms":"Na,Na,Na,P,O2,O2"},"NbHfTi":{"elms":"Nb,Hf,Ti"},"Nd2Fe14B":{"elms":"Nd,Nd,Fe,Fe,Fe,Fe,Fe,Fe,Fe,Fe,Fe,Fe,Fe,Fe,Fe,Fe,B"},"Nd2O3":{"elms":"Nd,Nd,O3"},"NdCl3":{"elms":"Nd,Cl2,Cl"},"NdPr":{"elms":"Nd,Pr"},"NiCrFeNbMoTiAl":{"elms":"Ni,Cr,Fe,Nb,Mo,Ti,Al"},"NpO2":{"elms":"Np,O2"},"O2":{"elms":"O,O"},"O3":{"elms":"O,O2"},"OsO4":{"elms":"Os,O3,O"},"P4":{"elms":"P,P,P,P"},"PaO2":{"elms":"Pa,O2"},"PbF2":{"elms":"Pb,F2"},"PbI2":{"elms":"Pb,I2"},"PbN6":{"elms":"Pb,N2,N2,N2"},"PbO":{"elms":"Pb,O"},"PbO2":{"elms":"Pb,O2"},"PbSn":{"elms":"Pb,Sn"},"PbTe":{"elms":"Pb,Te"},"PdAu":{"elms":"Pd,Au"},"PdCl2":{"elms":"Pd,Cl2"},"Pm2O3":{"elms":"Pm,Pm,O3"},"PmCl3":{"elms":"Pm,Cl2,Cl"},"PoO2":{"elms":"Po,O2"},"PtCo":{"elms":"Pt,Co"},"PtOs":{"elms":"Pt,Os"},"PuO2":{"elms":"Pu,O2"},"Rb2Te":{"elms":"Rb,Rb,Te"},"ReW":{"elms":"Re,W"},"RuPtPd":{"elms":"Ru,Pt,Pd"},"SCl2":{"elms":"S,Cl2"},"SF6":{"elms":"S,F2,F2,F2"},"SO2":{"elms":"S,O2"},"S2O2":{"elms":"S,S,O2"},"Sb2O3":{"elms":"Sb,Sb,O3"},"Sc2O3":{"elms":"Sc,Sc,O3"},"ScI3":{"elms":"Sc,I2,I"},"SeO2":{"elms":"Se,O2"},"SeS2":{"elms":"Se,S,S"},"SiC":{"elms":"Si,C"},"SiGe":{"elms":"Si,Ge"},"SiH4":{"elms":"Si,H2,H2"},"SiO2":{"elms":"Si,O2"},"Sm2O3":{"elms":"Sm,Sm,O3"},"SmCo5":{"elms":"Sm,Co,Co,Co,Co,Co"},"SnAg":{"elms":"Sn,Ag"},"SnCl2":{"elms":"Sn,Cl2"},"SnCu":{"elms":"Sn,Cu"},"SnCuSbPb":{"elms":"Sn,Cu,Sb,Pb"},"SnF2":{"elms":"Sn,F2"},"SnSb5":{"elms":"Sn,Sb,Sb,Sb,Sb,Sb"},"SnZnBi":{"elms":"Sn,Zn,Bi"},"SrCl2":{"elms":"Sr,Cl2"},"TaO":{"elms":"Ta,O"},"Tb4O7":{"elms":"Tb,Tb,Tb,Tb,O3,O3,O"},"Te3O2":{"elms":"Te,Te,Te,O2"},"ThF4":{"elms":"Th,F2,F2"},"ThO2":{"elms":"Th,O2"},"TiB2":{"elms":"Ti,B,B"},"TiC":{"elms":"Ti,C"},"TiN":{"elms":"Ti,N"},"TiO2":{"elms":"Ti,O2"},"Ti6Al4V":{"elms":"Ti,Ti,Ti,Ti,Ti,Ti,Al,Al,Al,Al,V"},"TlCl":{"elms":"Tl,Cl"},"TlHg":{"elms":"Tl,Hg"},"TlI":{"elms":"Tl,I"},"TlS":{"elms":"Tl,S"},"Tm2O3":{"elms":"Tm,Tm,O3"},"U3O8":{"elms":"U,U,U,O3,O3,O2"},"UO2":{"elms":"U,O2"},"UO3":{"elms":"U,O3"},"VC":{"elms":"V,C"},"VCl4":{"elms":"V,Cl2,Cl2"},"VN":{"elms":"V,N"},"VO2":{"elms":"V,O2"},"WC":{"elms":"W,C"},"XeF2":{"elms":"Xe,F2"},"XeNe":{"elms":"Xe,Ne"},"Y2O3":{"elms":"Y,Y,O3"},"Yb2O3":{"elms":"Yb,Yb,O3"},"ZnCl2":{"elms":"Zn,Cl2"},"ZnCuSn":{"elms":"Zn,Cu,Sn"},"ZnO":{"elms":"Zn,O"},"ZnTe":{"elms":"Zn,Te"},"ZrC":{"elms":"Zr,C"},"ZrO2":{"elms":"Zr,O2"},"CaCl2O2":{"elms":"Ca,Cl,Cl,O,O"},"ClO,O2":{"elms":"Cl,O3"},"H2CO3":{"elms":"H,H,O,C,O,O"},"NCl3":{"elms":"N,Cl,Cl,Cl"},"NH4Cl":{"elms":"N,H,H,H,H,Cl"},"ZrOCl":{"elms":"Zr,O,Cl"},"Cm2O3":{"elms":"Cm,Cm,O3"},"CmCl3":{"elms":"Cm,Cl2,Cl"},"CmF3":{"elms":"Cm,F2,F"},"CmF4":{"elms":"Cm,F2,F2"},"CmI3":{"elms":"Cm,I2,I"},"CmO":{"elms":"Cm,O"},"CmO2":{"elms":"Cm,O2"},"Es2O3":{"elms":"Es,Es,O3"},"EsBr3":{"elms":"Es,Br3"},"EsCl2":{"elms":"Es,Cl2"},"EsF3":{"elms":"Es,F2,F"},"EsI2":{"elms":"Es,I2"},"K2O2":{"elms":"K,K,O2"}}' ) );
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

				setTimeout( ()=> {
					$( '.modal-body' )[ 0 ].scrollTop = 0;
				}, 500 );
			}
		} );

		$( '.delBtn' ).off().on( 'click', function( e ) {
			console.log( $( this ).attr( 'customData' ) );

			var toCheck = confirm( 'Are you sure, You wanna delete?' );

			if( toCheck ) {
				$.post( "http://localhost:8031/api/deleteRow", {
					"key": $( this ).attr( 'customData' )
				}, function( data ) {
					console.log( data );
					oScope.API_data = data;
					creatSkeleton.call( oScope );
				}, "json");

			}

				
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

		$( '.addProperty' ).off().on( 'click', function() {

			var prop = $( '#gProp' ).val().trim();

			$.post( "http://localhost:8031/api/addGlobalProp", {
				"key": prop
			}, function( data ) {

				oScope.API_data = data;
				creatSkeleton.call( oScope );
				
			} );

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

		var imgText = ( p_obj.imgUrl ) ? p_obj.imgUrl.length > 150 ? 'too long' : p_obj.imgUrl : '-';

		$( '#IUPAC' ).val( p_obj.name || '-' );
		$( '#CAS' ).val( p_obj.CAS || '-' );
		$( '#desc' ).val( p_obj.desc || '-' );
		$( '#imgUrl' ).val( imgText );
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
		$( '#formula' ).val( p_obj.eq ? p_obj.eq.join( '|' ) : '-' || '-' );
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