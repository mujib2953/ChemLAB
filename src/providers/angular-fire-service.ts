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
	elementsList: any;

	difficultyLevel: Array<String> = [
		'Beginner',
		'Intermediate',
		'Master',
		'xtreamz'
	];

	previousPage: any;

	constructor(
		public http: Http,

		public af: AngularFire
	) {
		console.log('Hello AngularFireService Provider');

		this.elementsList = this.af.database.list('/elements');
	}

	getAllElements(): any {
		return this.elementsList;
	}

	getElement( name: string ): any {

		return '';
	}
}
