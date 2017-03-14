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


	selectReactantCount(): void {
		let alert = this.alertCtrl.create();
		alert.setTitle('Number of Reactants');

		alert.addInput({
			type: 'range',
			label: 'Blue',
			// min: 0, 
			// max: 50,
			// value: 0,
			// step: 5
			// value: 'blue',
			// checked: true
		});

		alert.addButton('Cancel');
		alert.addButton({
			text: 'OK',
			handler: data => {
			// this.testRadioOpen = false;
			// this.testRadioResult = data;
			}
		});
		
		alert.present();
		
	}
}
