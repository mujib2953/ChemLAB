import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

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
	loader: any;

	// --- temp vars
	chats: any;
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,

		public loadingCtrl: LoadingController,

		// --- custom services
		public AFS: AngularFireService
	) {
		let scope: any = this;

		this.toggleLoader( true );
		
		this.levels = this.AFS.difficultyLevel;
		// console.log( this.levels );

		if( typeof(Storage) !== "undefined" && localStorage.getItem( "allElements" ) == undefined ) {
            scope.AFS.put( ' Loading from DB ' );
			this.AFS.elementsList.subscribe( data => {
				console.log( data );
				scope.AFS.elmList = data;

				localStorage.setItem("allElements", JSON.stringify( data ) );

				scope.toggleLoader( false );
			} );

		} else {
            scope.AFS.put( ' Loading from Local Storage ' );
			scope.AFS.elmList = JSON.parse( localStorage.getItem( "allElements" ) );
			scope.toggleLoader( false );

		}

			
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

	// --- loader
	toggleLoader( status: boolean ): void {

		if( status ) {
			this.loader = this.loadingCtrl.create({});
			this.loader.present();
		} else {
			this.loader.dismiss();
		}

	}

	put( data: any ): void {
		console.log( data );
	}
}
