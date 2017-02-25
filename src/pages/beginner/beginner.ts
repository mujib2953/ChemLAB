import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { AngularFireService } from '../../providers/angular-fire-service';
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

	searchElem: string = '';
	shouldShowCancel: boolean = false;

	allElements: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,

		private AFS: AngularFireService 
	) {
		this.allElements = this.navParams.get( 'pushData' );
		console.log( this.allElements );
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BeginnerPage');
	}

	onInput( evnt: any ): void {
		console.log( evnt );
	}

	backToPrevPage(): void {
		console.log( 'back...' );

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

	}
}
