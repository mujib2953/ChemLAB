import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';


import { AngularFireService } from '../../providers/angular-fire-service';

// ---
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

	loader: any;

	searchElem: string = '';
	shouldShowCancel: boolean = false;

	allElements: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public LoadCtrl: LoadingController,

		private AFS: AngularFireService 
	) {

		this.toggleLoader( true );

		this.allElements = this.navParams.get( 'pushData' );
		console.log( this.allElements );

		if( this.allElements === undefined ) {

			let tempData = this.AFS.getAllElements();
			tempData.subscribe( data=> {
				this.allElements = data;

				this.toggleLoader( false );
			} );

		} else {
			this.toggleLoader( false );
		}

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BeginnerPage');
	}

	toggleLoader( status: boolean ): void {


		if( status ) {
			this.loader = this.LoadCtrl.create({});
			this.loader.present();
		} else {
			console.log( 'called' );
			this.loader.dismiss();
		}

	}

	onInput( evnt: any ): void {
		console.log( evnt );
	}

	backToPrevPage(): void {
		this.navCtrl.pop( this.AFS.previousPage );
	}

	showOptions( key ): void {

		let retObj: any;
		for( let i in this.allElements ) {

			let elm = this.allElements[ i ];

			if( elm.name == key ) {
				retObj = elm;
				break;
			}

		}
		console.log( key )
		console.log( retObj )
		
		this.AFS.previousPage = BeginnerPage;
		this.navCtrl.push( ElementsDetailsPage, {
			pushData: retObj
		} );

	}

}
