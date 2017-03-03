import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AngularFireService } from '../../providers/angular-fire-service';

// --- Pages
import { BeginnerPage } from '../beginner/beginner';
import { DummyPage } from '../dummy/dummy';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	allElements: any;	
	levels: any;


	constructor(
		public navCtrl: NavController,

		private AFS: AngularFireService 
	) {

		this.levels = this.AFS.difficultyLevel;

		let tempData = this.AFS.getAllElements();
		tempData.subscribe( data=> {
			this.allElements = data;
		} );
	}

	ngOnInit() {

	}

	goToPage( name: string ): void {
		console.log( name );
		
		let moveToPage: any;
		let shareData: any = {};
		
		switch ( name ) {
			case "Beginner":
					moveToPage = BeginnerPage;
					shareData = this.allElements
				break;
			
			case 'Intermediate':
				moveToPage = DummyPage;
				shareData = 'Intermediate';
			break;

			case 'Master':
				moveToPage = DummyPage;
				shareData = 'Master';
			break;

			case 'Xtreamz':
				moveToPage = DummyPage;
				shareData = 'Xtreamz';
			break;

			default:
				// code...
				break;
		}
		this.AFS.previousPage = moveToPage;
		this.navCtrl.push( moveToPage, {
			pushData: shareData
		} );
	}

	
}
