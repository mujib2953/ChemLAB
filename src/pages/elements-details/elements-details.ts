import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
		public navParams: NavParams
	) {
		this.element = this.navParams.get( 'urlData' )
		console.log( this.element );
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ElementsDetailsPage');
	}

}
