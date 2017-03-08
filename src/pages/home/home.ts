import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Database } from '@ionic/cloud-angular';

// --- services
import { AngularFireService } from '../../providers/angular-fire-service';

// --- Pages
// import { DummyPage } from '../dummy/dummy';
import { BeginnerPage } from '../beginner/beginner';
import { IntermediatePage } from '../intermediate/intermediate';
import { MasterPage } from '../master/master';
import { XtremzPage } from '../xtremz/xtremz';
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

	// --- temp vars
	chats: any;
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,

		// --- custom services
		public AFS: AngularFireService,

		public db: Database
	) {

		this.commonDBFunc();

		this.levels = this.AFS.difficultyLevel;
		console.log( this.levels );
	}

	commonDBFunc(): void {

		this.db.connect();
		this.sendMessage( 'Hello Ionic' );
		// this.db.collection('chats').watch().subscribe( (chats) => {
		// 	this.chats = chats;
		// }, (error) => {
		// 	console.error(error);
		// });

	}

	sendMessage(message: string) {
		this.db.collection('chats').store({text: message, time: Date.now()});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad HomePage');
	}

	// --- for navigation
	moveToPage( pageName: string ): void {

		console.log( pageName );

		let page: any;
		let sharedData: any = {};
		let pageFound: boolean = true;

		switch ( pageName ) {
			case "Beginner":
				page = BeginnerPage;
			break;
			
			case "Intermediate":
				page = IntermediatePage;
			break;

			case 'Master':
				page = MasterPage;
			break;

			case 'Xtreamz':
				page = XtremzPage;
			break;

			default:
				pageFound = false;
				console.warn( pageName + ' :: page is not found in the list' );
			break;
		}

		if( pageFound )
			this.navCtrl.push( page, sharedData );

	}

	put( data: any ): void {
		console.log( data );
	}
}
