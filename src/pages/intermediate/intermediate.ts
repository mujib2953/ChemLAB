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
	};
	loader: any; // --- pages loader
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,

		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,

		public AFS: AngularFireService
	) {

		let scope: any = this;

		this.toggleLoader( true );
		this.AFS.loadReaction( ()=> {
			this.toggleLoader( false );
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
		console.log( this.gObj.nReactantCount );
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
}
