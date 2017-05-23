import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { AngularFireService } from '../../providers/angular-fire-service';
/*
Generated class for the Reaction page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
    selector: 'page-reaction',
    templateUrl: 'reaction.html'
})
export class ReactionPage {

	loader: any;
	gObj: any = {};
    compDetails: any = {};
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,

        public loadingCtrl: LoadingController,

        public AFS: AngularFireService
    ) {
    	console.log( this.navParams.data );
    	// this.toggleLoader( true );
    	this.gObj.currentCompound = this.navParams.get( 'sharedData' );
    	this.getData();

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ReactionPage');
    }

    toggleLoader( status: boolean ): void {

    	if( status ) {

    		if( this.loader == undefined )
    			this.loader = this.loadingCtrl.create();
    		
    		this.loader.present();

    	} else {

    		if( this.loader != undefined )
    			this.loader.dismiss();

    		this.loader = undefined;

    	}

    }

    getData(): void {

    	
        this.AFS.aGet( 'api/getReactionDetails/' + this.gObj.currentCompound )
            .map( res=> res.json() )
            .subscribe( res=> {
                console.log( res );

                if( res.name != undefined ) {
                    this.compDetails = res
                    console.log( this.compDetails );
                }

                
            } );
    }

    getClassName( propName: any ): void {
        console.log( propName );
        let className: any;
        switch( propName ) {

            case 'Harmful':
                className = 'sprite-harmful';
            break;

            default:
                className = 'sprite-EU_DSD';
            break;

        }

        return className;
    }

}