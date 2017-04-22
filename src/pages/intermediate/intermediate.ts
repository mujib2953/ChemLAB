import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';

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
		nReactantCount: true, // --- True --> 2 and False --> 3, Reactants,
		gaming: 'NES' // --- First dropdown always selected the first value
	};

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,

		public actionSheetCtrl: ActionSheetController,
		public alertCtrl: AlertController
	) {

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad IntermediatePage');
	}

	changeReactantCount(): void {
		this.gObj.nReactantCount = !this.gObj.nReactantCount;
		console.log( this.gObj.nReactantCount );
	}

	
}
