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

    put( msg: any ): void {
        console.log( '%c ' + msg + ' ', 'background: #000; color: #FFF' );
    }

    addClass( elem: any, className: string ): void {
    	elem.classList.add( className );
    }

    removeClass( elem: any, className: string ): void {
    	elem.classList.remove( className );
    }

    getDeveloper(): any {

    	let list: any = [
	    	{
	    		name: 'Mujib Ansari',
	    		about: 'JS developer, and thinker.',
	    		img_src: 'https://lh3.googleusercontent.com/-Nx5ingytOns/AAAAAAAAAAI/AAAAAAAAAAA/AMcAYi8KjPn7_tIQ58aRgI6QWB_qSpGj-w/s48-c-mo/photo.jpg',
	    		desc: 'JS developer currently working at Sportz Interactive, Mumbai as Associate Developer JS. Always want to learn new technology. Loves Physics, Chemistry, AeroSpace and AeroPhysics.',
	    		email: 'ansarimujiburrehman@gmail.com',
	    		fb: 'https://www.facebook.com/Mujib2953',
	    		gPlus: 'https://plus.google.com/110340391375900201569',
	    		quora: 'https://www.quora.com/profile/Mujibur-Rehman-Ansari'
	    	}, {
	    		name: 'Mujib Ansari',
	    		about: 'JS developer, and thinker.',
	    		img_src: 'https://lh3.googleusercontent.com/-Nx5ingytOns/AAAAAAAAAAI/AAAAAAAAAAA/AMcAYi8KjPn7_tIQ58aRgI6QWB_qSpGj-w/s48-c-mo/photo.jpg',
	    		desc: 'JS developer currently working at Sportz Interactive, Mumbai as Associate Developer JS. Always want to learn new technology. Loves Physics, Chemistry, AeroSpace and AeroPhysics.',
	    		email: 'ansarimujiburrehman@gmail.com',
	    		fb: 'https://www.facebook.com/Mujib2953',
	    		gPlus: 'https://plus.google.com/110340391375900201569',
	    		quora: 'https://www.quora.com/profile/Mujibur-Rehman-Ansari'
	    	}
    	];

    	return list;
    }

}
