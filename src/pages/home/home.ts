import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

// --- services
import { AngularFireService } from '../../providers/angular-fire-service';

// --- Pages
// import { DummyPage } from '../dummy/dummy';
import { BeginnerPage } from '../beginner/beginner';
import { IntermediatePage } from '../intermediate/intermediate';
import { MasterPage } from '../master/master';
import { XtremzPage } from '../xtremz/xtremz';
import { KnowUsPage } from '../know-us/know-us';
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
		public toastCtrl: ToastController,

		// --- custom services
		public AFS: AngularFireService
	) {
		let scope: any = this;

		this.levels = this.AFS.difficultyLevel;
		
		/*
        * If elmList is not initialozed then again call the function.
        * First time it was called in app.component.ts
        */
		if( this.AFS.elmList == undefined ) {

			this.toggleLoader( true );
			this.AFS.loadJSON( function(){
                scope.toggleLoader( false );
            } );

		}	
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad HomePage');
	}

	/*
	* For Navigation from Home to Specif page
	* Params <string> :: The name of the page where we want to go.
	* Params <Boolean> :: Whether that page is Active for end User or not.
	*/
	moveToPage( pageName: string, isActive: boolean ): void {

		let page: any;
		let sharedData: any = {};
		let pageFound: boolean = true;

		if( !isActive ) {
			this.showToast();
			return;
		}

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

			case 'KnowUsPage':
				page = KnowUsPage;
			break;

			default:
				pageFound = false;
				console.warn( pageName + ' :: page is not found in the list' );
			break;
		}

		if( pageFound )
			this.navCtrl.push( page, sharedData );
	}

	/*
	* Responsible for the loader to show and hide
	*/
	toggleLoader( status: boolean ): void {

		if( status ) {
			this.loader = this.loadingCtrl.create({});
			this.loader.present();
		} else {
			this.loader.dismiss();
		}
	}

	/*
	* Show Toast message if the page is not ready for end-user.
	* i.e The page is under development
	*/
	showToast(): void {
		let toast: any = this.toastCtrl.create({
			message: 'This is under development, will come soon.',
			duration: 1500
		});
		toast.present();
	}

	/*
	* Just to print the view data
	* Params< any >:: the data which needs to print on console
	*/
	put( data: any ): void {
		console.log( data );
	}
}
