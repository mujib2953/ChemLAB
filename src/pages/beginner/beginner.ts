import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// --- services
import { AngularFireService } from '../../providers/angular-fire-service';

// --- pages
import { ElementsDetailsPage } from '../elements-details/elements-details';
/*
  Generated class for the Beginner page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-beginner',
  templateUrl: 'beginner.html'
})
export class BeginnerPage {

  	allElementList: string[];

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,

		public AFS: AngularFireService
	) {
		this.initializeItems();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BeginnerPage');
	}

	/*
	* Assign element List to View
	* Reading data from Service
	*/
	initializeItems() {
		this.allElementList = this.AFS.elmList;
	}

	/*
	* On Seacrh
	*/
	getItems( ev: any ): void {
		// Reset element List back to orginal state
		this.initializeItems();

		// set val to the value of the searchbar
		let val = ev.target.value;
		
		// if the value is an empty string don't filter the items
		if (val && val.trim() != '') {
			this.allElementList = this.allElementList.filter((item) => {
				return (item[ 'name' ].toLowerCase().indexOf(val.toLowerCase()) > -1);
			})
		}
	}

	/*
	* For Navigation from Home to specific page
	* @Params :: Object of the elemnet
	*/
	moveToPage( data: any ): void {

		this.navCtrl.push( ElementsDetailsPage, {
			urlData: data
		} );

	}

}
