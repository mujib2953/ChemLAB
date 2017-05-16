import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ModalController  } from 'ionic-angular';

import { AngularFireService } from '../../providers/angular-fire-service';

import { ReactionPage } from '../reaction/reaction';


/*
  Generated class for the Intermediate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-intermediate',
  templateUrl: 'intermediate.html'
})
export class IntermediatePage {

	gObj: any = {
		nReactantCount: true, 	// --- True --> 2 and False --> 3, Reactants,
		isButtonActive: false,  // --- responsible for activating and deactivating the React button
		reactant_1: [],
		reactant_2: [],
		userData: {
			elm_1: '',
			elm_2: '',
			elm_3: ''
		}
	};
	loader: any; // --- pages loader
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,

		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public modalCtrl: ModalController,

		public AFS: AngularFireService
	) {

		// this.toggleLoader( true );
		// this.AFS.loadReaction( ()=> {
		// 	this.gObj.ractant_1 = this.AFS.reactionJSON;
		// 	this.toggleLoader( false );			
		// });

		this.gObj.gData = JSON.parse( '{"Ag":{"O":{"elm":"AgO","e":"O"},"N":{"elm":"AgN3","e":"N"},"C":{"elm":"AgOCN","e":"C"},"S":{"elm":"Ag2S","e":"S"},"Br":{"elm":"AgBr","e":"Br"},"Cl":{"elm":"AgCl","e":"Cl"},"I":{"elm":"AgI","e":"I"}},"O":{"Ag":{"elm":"AgO","e":"Ag"},"N":{"elm":"AgOCN","e":"N"},"C":{"elm":"AgOCN","e":"C"},"Al":{"elm":"Al2O3","e":"Al"}},"N":{"Ag":{"elm":"AgN3","e":"Ag"},"O":{"elm":"AgOCN","e":"O"},"C":{"elm":"AgOCN","e":"C"}},"C":{"Ag":{"elm":"AgOCN","e":"Ag"},"O":{"elm":"AgOCN","e":"O"},"N":{"elm":"AgOCN","e":"N"}},"S":{"Ag":{"elm":"Ag2S","e":"Ag"}},"Br":{"Ag":{"elm":"AgBr","e":"Ag"}},"Cl":{"Ag":{"elm":"AgCl","e":"Ag"}},"I":{"Ag":{"elm":"AgI","e":"Ag"}},"Al":{"O":{"elm":"Al2O3","e":"O"}}}' );
		this.generateReactant_1()

		console.log( this.gObj.gData );
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad IntermediatePage');
	}

	generateReactant_1(): void {

		for( let i in this.gObj.gData ) {

			this.gObj.reactant_1.push( i );

		}
		console.log( this.gObj.reactant_1 );
	};


	/*
	* On Toggle change
	*/
	changeReactantCount(): void {
		this.gObj.nReactantCount = !this.gObj.nReactantCount;
		// console.log( this.gObj.nReactantCount );
	}

	/*
	* Toggle Loader
	*/
	toggleLoader( status: boolean ): void {

		if( status ) {

			if( this.loader == undefined ) {
				this.loader = this.loadingCtrl.create();
				this.loader.present();
			}

		} else {

			if( this.loader ) {
				this.loader.dismiss();
				this.loader = undefined;
			}

		}

	}

	/*
	* On Reactant #1 selection
	*/
	reactant_1_Selection(): void {
		this.gObj.reactant_2 = this.getData();
	}

	/*
	* On Reactant #2 selection
	*/
	reactant_2_Selection(): void {
		
		if( this.gObj.nReactantCount ) {
			this.gObj.isButtonActive = true;
		}
	}

	/*
	* On Reactant #3 selection
	*/
	reactant_3_Selection(): void {
		
		if( !this.gObj.nReactantCount ) {
			this.gObj.isButtonActive = true;
		}
	}

	/*
	* On Ract button clicked
	*/
	reactElements(): any {

		let modal = this.modalCtrl.create( ReactionPage, {
			sharedData: this.gObj.gData[ this.gObj.userData.elm_1 ][ this.gObj.userData.elm_2 ]
		} );
    	modal.present();
	}	

	/*
	* Format the drop-down data as per my requirements
	*/
	getData(): any {

		let data: any = [];
		// let tempData: any = this.AFS.reactionFormattedJSON[ this.gObj.userData.elm_1 ];

		// for( let i in tempData ) {

		// 	data.push({
		// 		$key: i,
		// 		data: tempData[ i ]
		// 	});

		// }

		let selectedArray: any = this.gObj.gData[ this.gObj.userData.elm_1 ]

		for( let i in selectedArray ) {
			data.push( i );
		}
		console.log( data );
		return data;
	}

}
