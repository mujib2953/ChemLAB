import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ModalController  } from 'ionic-angular';

import { AngularFireService } from '../../providers/angular-fire-service';

import { ReactionPage } from '../reaction/reaction';


/*
  Generated class for the Intermediate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-intermediate',
  templateUrl: 'intermediate.html'
})
export class IntermediatePage {

	gObj: any = {
		nReactantCount: true, 	// --- True --> 2 and False --> 3, Reactants,
		isButtonActive: false,  // --- responsible for activating and deactivating the React button
		reactant_1: [],
		reactant_2: [],
		userData: {
			elm_1: '',
			elm_2: '',
			elm_3: ''
		}
	};
	loader: any; // --- pages loader
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,

		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public modalCtrl: ModalController,

		public AFS: AngularFireService
	) {

		this.toggleLoader( true );
		this.AFS.loadReaction1stTier( ()=> {
			this.gObj.reactant_1 = this.AFS.gReaction.firstTier.result;
			this.toggleLoader( false );			
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad IntermediatePage');
	}

	/*
	* On Toggle change
	*/
	changeReactantCount(): void {
		this.gObj.nReactantCount = !this.gObj.nReactantCount;
		// console.log( this.gObj.nReactantCount );
	}

	/*
	* Toggle Loader
	*/
	toggleLoader( status: boolean ): void {

		if( status ) {

			if( this.loader == undefined ) {
				this.loader = this.loadingCtrl.create();
				this.loader.present();
			}

		} else {

			if( this.loader ) {
				this.loader.dismiss();
				this.loader = undefined;
			}

		}

	}

	/*
	* On Reactant #1 selection
	*/
	reactant_1_Selection(): void {
		this.toggleLoader( true );
		this.AFS.aGet( 'api/getSecondTierChemTree/' + this.gObj.userData.elm_1 )
			.map( res=> res.json() )
			.subscribe( res=> {
				this.gObj.tier2Data = res.result;

				let tempArr = [];
				for( let i in this.gObj.tier2Data ) {
					tempArr.push( i );
				}
				this.gObj.reactant_2 = tempArr;
				console.log( res );
				this.toggleLoader( false );
			} );
		
	}

	/*
	* On Reactant #2 selection
	*/
	reactant_2_Selection(): void {
		
		if( this.gObj.nReactantCount ) {
			this.gObj.isButtonActive = true;
		}
	}

	/*
	* On Reactant #3 selection
	*/
	reactant_3_Selection(): void {
		
		if( !this.gObj.nReactantCount ) {
			this.gObj.isButtonActive = true;
		}
	}

	/*
	* On Ract button clicked
	*/
	reactElements(): any {

		let passingData: any;

		if( this.gObj.tier2Data[ this.gObj.userData.elm_2 ].length == 1 )
			passingData = this.gObj.tier2Data[ this.gObj.userData.elm_2 ][ 0 ];
		else {
			/*
			* Will need to work
			*/
			passingData = this.gObj.tier2Data[ this.gObj.userData.elm_2 ][ 0 ];
		}


		let modal = this.modalCtrl.create( ReactionPage, {
			sharedData: passingData
		} );
    	modal.present();
	}
}
