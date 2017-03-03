import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFireService } from '../../providers/angular-fire-service';

/*
  Generated class for the ElementsDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-elements-details',
  templateUrl: 'elements-details.html'
})
export class ElementsDetailsPage {

	element: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,

		private AFS: AngularFireService
	) {

		this.element = this.navParams.get( 'pushData' );
		this.element =  {
	            
            "name": "Hydrogen",
            "symbol": "H",
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
            "electronegativity": "2.20",

            "electron_config": "1s<sup>1</sup>",

            "key_isotopes": [
                "1<sup></sup>H",
                "2<sup></sup>H",
            ],
                        
            
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
        }
		console.log( this.element );
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ElementsDetailsPage');
	}

	backToPrevPage(): void {
		this.navCtrl.pop( this.AFS.previousPage );
	}

	putData( data: any ): void {
		console.log( data );
	}

}
