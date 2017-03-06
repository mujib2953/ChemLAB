import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// --- services
import { AngularFireService } from '../../providers/angular-fire-service';

// --- Pages


/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	levels: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,

		// --- custom services
		public AFS: AngularFireService
	) {

		this.levels = this.AFS.difficultyLevel;
		console.log( this.levels );
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad HomePage');
	}


	put( data: any ): void {
		console.log( data );
	}
}
