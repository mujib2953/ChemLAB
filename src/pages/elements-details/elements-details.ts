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
		console.log( this.element );
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ElementsDetailsPage');
	}

	backToPrevPage(): void {
		this.navCtrl.pop( this.AFS.previousPage );
	}

}
