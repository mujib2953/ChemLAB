import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { AngularFireService } from '../../providers/angular-fire-service'

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
		gaming: 'nes', 			// --- First dropdown always selected the first value
		isButtonActive: false,  // --- responsible for activating and deactivating the React button
		ractant_1: undefined,
		ractant_2: [],
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

		public AFS: AngularFireService
	) {

		this.toggleLoader( true );
		this.AFS.loadReaction( ()=> {
			this.gObj.ractant_1 = this.AFS.reactionJSON;
			this.toggleLoader( false );
			// console.log( this.gObj.ractant_1 );
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad IntermediatePage');
	}

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
	ractant_1_Selection(): void {
		this.gObj.ractant_2 = this.getData();
	}

	/*
	* On Reactant #2 selection
	*/
	ractant_2_Selection(): void {
		// this.gObj.ractant_2 = this.getData();
		if( this.gObj.nReactantCount ) {
			this.gObj.isButtonActive = true;
		}
	}

	/*
	* On Reactant #3 selection
	*/
	ractant_3_Selection(): void {
		// this.gObj.ractant_2 = this.getData();
		if( !this.gObj.nReactantCount ) {
			this.gObj.isButtonActive = true;
		}
	}

	/*
	* On Ract button clicked
	*/
	reactElements(): any {

	}	

	/*
	* Format the drop-down data as per my requirements
	*/
	getData(): any {

		let data: any = [];
		let tempData: any = this.AFS.reactionFormattedJSON[ this.gObj.userData.elm_1 ];

		for( let i in tempData ) {

			data.push({
				$key: i,
				data: tempData[ i ]
			});

		}
		return data;
	}

}
