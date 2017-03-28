import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFire } from 'angularfire2';



/*
  Generated class for the AngularFireService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AngularFireService {

	// elementsList: FirebaseListObservable<any>;
	elementsList: any; //--- holds subscriber data from API
	elmList: any; //--- holds actual json list

	difficultyLevel: Array<String> = [
		'Beginner',
		'Intermediate',
		'Master',
		'Xtreamz'
	];

	previousPage: any;

	constructor(
		public http: Http,

		public af: AngularFire
	) {
		console.log('Hello AngularFireService Provider');

		if( typeof(Storage) !== "undefined" && localStorage.getItem( "allElements" ) == undefined ) {
			
			// this.elementsList = this.af.database.list( '/elements' );
			this.elementsList = this.af.database.list( '/newElements' );

		} 
	}

}
