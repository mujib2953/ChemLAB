import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// import { AngularFire } from 'angularfire2';

/*
  Generated class for the AngularFireService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AngularFireService {

	// elm_DB_Ref: FirebaseListObservable<any>;
	elm_DB_Ref: any;                      //--- holds subscriber data from API
	elmList: any;                         //--- holds actual json list

	difficultyLevel: Array<any> = [
		{ dispName: "Basic Elements", name: 'Beginner', isActive: true },
		{ dispName: "Elements reaction", name: 'Intermediate', isActive: true },
        { dispName: "Molucule reaction", name: 'Master', isActive: false },
        { dispName: "Organic Chemistry", name: 'Xtreamz', isActive: false }
	];

    reactionJSON: any;
    reactionFormattedJSON: any;


    //  ---- New
    private MongoUrl: string = 'http://10.241.190.224:8031/';
    AllElmList: any = [];

	constructor(
		public http: Http,

		// public af: AngularFire
	) {
		console.log('Hello AngularFireService Provider');
    }
    
    /*
    * Coloured Console
    * Params<any> :: the msg to print on console. mainly it should not be an Array or Object
    */
    put( msg: any ): void {
        console.log( '%c ' + msg + ' ', 'background: #000; color: #FFF' );
    }

    /*
    * Add class to element
    * Params<any> :: Element refrence ( DOM refrence )
    * Params<string> :: Name of class needs to add
    */
    addClass( elem: any, className: string ): void {
    	elem.classList.add( className );
    }
    /*
    * Remove class to element
    * Params<any> :: Element refrence ( DOM refrence )
    * Params<string> :: Name of class needs to remove
    */
    removeClass( elem: any, className: string ): void {
        elem.classList.remove( className );
    }

    /*
    * Loads the All Reaction elements List in JSON format from firebase and-
    * -store in service's 'reactionJSON' variable
    * Params<function> :: A callback function which needs to be executed after data loads
    */
    // loadReaction( p_fCallback: any ): void {

    //     if( this.reactionJSON ) {
    //         if( p_fCallback )
    //             p_fCallback();
    //     } else {
            
    //         this.af.database.list( '/reactions' ).subscribe( data => {
                
    //             let tempData: any = {};

    //             for( let i in data ) {
    //                 tempData[  data[ i ].$key ] = data[ 0 ]
    //             }
                
    //             this.reactionJSON = data;
    //             this.reactionFormattedJSON = tempData;
                
    //             if( p_fCallback )
    //                 p_fCallback();
    //         } );

    //     }
    // }
    loadReaction( p_fCallback: any ): void {

        
        
    }

    /*
    * Read or Write the dates to local storage.
    * If return true Data needs to load from firebase otherwise from local-Storage.
    * If the hours difference of last stored date and current date is greater than 48 Hrs then - 
    * - data needs to load from Firebase.
    */
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
    
    /*
    * Return the developer Object for Know-Us page
    */
    getDeveloper(): any {

    	let list: any = [
	    	{
	    		name: 'Mujib Ansari',
	    		about: 'JS developer, and thinker.',
	    		img_src: 'https://lh3.googleusercontent.com/-Nx5ingytOns/AAAAAAAAAAI/AAAAAAAAAAA/AMcAYi8KjPn7_tIQ58aRgI6QWB_qSpGj-w/s48-c-mo/photo.jpg',
	    		desc: 'JS developer, who loves to code. Always want to learn new technology. Loves Physics, Chemistry, AeroSpace and AeroPhysics.',
	    		email: 'ansarimujiburrehman@gmail.com',
	    		fb: 'https://www.facebook.com/Mujib2953',
	    		gPlus: 'https://plus.google.com/110340391375900201569',
	    		quora: 'https://www.quora.com/profile/Mujibur-Rehman-Ansari'
	    	}/*, {
	    		name: 'Mujib Ansari',
	    		about: 'JS developer, and thinker.',
	    		img_src: 'https://lh3.googleusercontent.com/-Nx5ingytOns/AAAAAAAAAAI/AAAAAAAAAAA/AMcAYi8KjPn7_tIQ58aRgI6QWB_qSpGj-w/s48-c-mo/photo.jpg',
	    		desc: 'JS developer currently working at Sportz Interactive, Mumbai as Associate Developer JS. Always want to learn new technology. Loves Physics, Chemistry, AeroSpace and AeroPhysics.',
	    		email: 'ansarimujiburrehman@gmail.com',
	    		fb: 'https://www.facebook.com/Mujib2953',
	    		gPlus: 'https://plus.google.com/110340391375900201569',
	    		quora: 'https://www.quora.com/profile/Mujibur-Rehman-Ansari'
	    	}*/
    	];

    	return list;
    }

    /*
    * Return the refrences Object for Know-Us page
    */
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

    getCompundDetails(): any {
        return this.http.get( 'assets/jsonFiles/reactionDetails.json' );
    }


    /*
    * Get data from Node Server
    */
    getAllElementList( p_fCallback: any ): void {

        // AllElmList
        this.aGet( 'api/getAllElms' )
            .map( res=> res.json() )
            .subscribe( res=> {
                
                this.AllElmList = res;
                
                if( p_fCallback )
                    p_fCallback();
            } );

    }



    aGet( p_url ): any {

        return this.http.get( this.MongoUrl + p_url );

    }

}
