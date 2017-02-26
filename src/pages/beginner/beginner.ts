import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { AngularFireService } from '../../providers/angular-fire-service';

// ---
import { ElementsDetailsPage } from '../elements-details/elements-details';
/*
  Generated class for the Beginner page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-beginner',
  templateUrl: 'beginner.html'
})
export class BeginnerPage {

	searchElem: string = '';
	shouldShowCancel: boolean = false;

	allElements: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,

		private AFS: AngularFireService 
	) {
		this.allElements = this.navParams.get( 'pushData' );
		this.allElements =  [
	        {
	            "symbol": "H",
	            "name": "Hydrogen",
	            "type": "NONMETALS",
	            "img_src": "http://sod-a.rsc-cdn.org/www.rsc.org/periodic-table/content/Images/Elements/Hydrogen-L.jpg?6.0.3.0",

	            "discovery_date": "1766",
	            "discovered_by": "Henry Cavendish",
	            "origin_of_name": "The name is derived from the Greek 'hydro' and 'genes' meaning water forming. ",

	            "allotropes": [
	                "H<sub>2</sub>"
	            ],

	            "group": "1",
	            "period": "1",
	            "block": "s",
	            "state_at_20deg": "Gas",
	            "melting_point": "−259.16°C, −434.49°F, 13.99 K",
	            "boiling_point": "−252.879°C, −423.182°F, 20.271 K ",
	            "density": "0.000082",
	            
	            "relative_atomic_mass": "1.008",
	            "atomic_number": "1",

	            "electron_config": "1s<sup>1</sup>",

	            "key_isotopes": [
	                "1<sup></sup>H",
	                "2<sup></sup>H",
	            ],
	            

	            "proton": 1,

	            "electron_radius": "1.10",
	            "covalent_radius": "0.32",
	            "electron_affinity": "72.769",
	            "electronegativity": "2.20",
	            
	            "ionisation_energies": [
	                "1312.05", "-", "-", "-", "-", "-", "-", "-"
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
	        },
	        {
	            "proton": 2,
	            "Symbol": "He",
	            "name": "Helium",
	            "type": "NOBLE GASES",
	            "block": "S",
	            "boilingPoint": -268.9,
	            "Electronegativity": null,
	            "Density": 0.18,
	            "AtomicMass": 4.0026,
	            "IonizationEnergy": 2372,
	            "AtomicRadius": 0.31,
	            "AtomicRadius_InPicometers": 31,
	            "MeltingPoint": -272.2,
	            "ElementColor": "rgb(254,192,233)"
	        }
        ];
		console.log( this.allElements );
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BeginnerPage');
	}

	onInput( evnt: any ): void {
		console.log( evnt );
	}

	backToPrevPage(): void {
		this.navCtrl.pop( this.AFS.previousPage );
	}

	showOptions( key ): void {

		let retObj: any;
		for( let i in this.allElements ) {

			let elm = this.allElements[ i ];

			if( elm.name == key ) {
				retObj = elm;
				break;
			}

		}
		console.log( key )
		console.log( retObj )
		
		this.AFS.previousPage = BeginnerPage;
		this.navCtrl.push( ElementsDetailsPage, {
			pushData: retObj
		} );

	}
}
