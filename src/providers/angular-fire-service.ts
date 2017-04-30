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

	// elm_DB_Ref: FirebaseListObservable<any>;
	elm_DB_Ref: any; //--- holds subscriber data from API
	elmList: any; //--- holds actual json list

	difficultyLevel: Array<any> = [
		{ "name": 'Beginner', isActive: true },
		{ "name": 'Intermediate', isActive: true },
        { "name": 'Master', isActive: false },
        { "name": 'Xtreamz', isActive: false }
	];

	previousPage: any;

	constructor(
		public http: Http,

		public af: AngularFire
	) {
		console.log('Hello AngularFireService Provider');
    }
    
    /*
    * Coloured Console
    */
    put( msg: any ): void {
        console.log( '%c ' + msg + ' ', 'background: #000; color: #FFF' );
    }

    /*
    * Add class to element
    */
    addClass( elem: any, className: string ): void {
    	elem.classList.add( className );
    }

    /*
    * Loads the Elements JSON
    */
    loadJSON( p_fCallback: any ): void {

        let scope: any = this;
    	let isToDownload: boolean = this.readDate();

        if( ( typeof(Storage) !== "undefined" && localStorage.getItem( "allElements" ) == undefined ) || isToDownload ) {
            
            scope.put( ' Loading from DB ' );
        	this.elm_DB_Ref = this.af.database.list( '/newElements' );
            this.elm_DB_Ref.subscribe( data => {
                
                scope.elmList = data;
                localStorage.setItem("allElements", JSON.stringify( data ) );

                if( p_fCallback )
                    p_fCallback();
            } );

        } else {
            scope.put( ' Loading from Local Storage ' );
            scope.elmList = JSON.parse( localStorage.getItem( "allElements" ) );

            if( p_fCallback )
                p_fCallback();
        }
        console.log( scope.elmList );

    }

    loadReaction( p_cb: any ): void {


        if( p_cb )
            p_cb();
    }

    readDate(): any {

    	let currentDate: any = new Date();
    	let criticalHrsDiff: number = 48;

		if( typeof(Storage) !== "undefined" && localStorage.getItem( "elmDates" ) == undefined ) {
			localStorage.setItem("elmDates", JSON.stringify( currentDate ) );
			return true;
		} else {

			let lastDownloadDate: any = localStorage.getItem( "elmDates" );
			let hoursDiff: any = Math.abs(lastDownloadDate - currentDate) / 36e5;

			if( hoursDiff > criticalHrsDiff )
				return true;
			else
				return false;
		}

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

    getRefrences(): any {

    	let list: any = [
    		{
    			link: 'https://en.wikipedia.org',
    			name: 'Wikipedia'
    		}, {
    			link: 'https://www.google.com',
    			name: 'Google'
    		}, {
    			link: 'http://www.rsc.org/',
    			name: 'Royal Society of Chemistry'
    		}, {
    			link: 'http://www.chemicool.com',
    			name: 'Chemicool'
    		}
    	];
    	return list;
    }

}
