import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the CustomSpacer page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	selector: 'custom-spacer',
	templateUrl: 'custom-spacer.html'
})
export class CustomSpacerPage {

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams
	) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CustomSpacerPage');
	}

}
