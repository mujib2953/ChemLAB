import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Master page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	selector: 'page-master',
	templateUrl: 'master.html'
})
export class MasterPage {

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams
	) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MasterPage');
	}

}
