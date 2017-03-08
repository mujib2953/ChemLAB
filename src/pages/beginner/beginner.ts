import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

	searchQuery: string = '';
  	items: string[];

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams
	) {
		this.initializeItems();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BeginnerPage');
	}

	initializeItems() {
		this.items = [
			'Amsterdam',
			'Bogota'
		];
	}

	getItems( ev: any ): void {
		// Reset items back to all of the items
		this.initializeItems();

		// set val to the value of the searchbar
		let val = ev.target.value;

		// if the value is an empty string don't filter the items
		if (val && val.trim() != '') {
			this.items = this.items.filter((item) => {
				return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
			})
		}
	}

}
