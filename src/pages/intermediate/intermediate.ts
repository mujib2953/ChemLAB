import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheet } from 'ionic-angular';

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

		public actionSheetCtrl: ActionSheet
	) {

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad IntermediatePage');
	}


	selectReactantCount(): void {

	}
}
