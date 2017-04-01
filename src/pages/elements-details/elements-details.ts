import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

// --- services
import { AngularFireService } from '../../providers/angular-fire-service';


/*
  Generated class for the ElementsDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-elements-details',
  templateUrl: 'elements-details.html'
})
export class ElementsDetailsPage {

	element: any;
    pageObj: any = {
        helpMsg: ''    
    };
    

    @ViewChild( 'loaderElem' ) loaderElem: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,

        public AFS: AngularFireService,

        public alertCtrl: AlertController
	) {
		this.element = this.navParams.get( 'urlData' )
		console.log( this.element );
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ElementsDetailsPage');
	}

	showHelp( type: string ): void {
		console.log( type );
        let elem = this.loaderElem.nativeElement;

        this.pageObj.helpMsg = type;
        this.AFS.removeClass( elem, 'gHide' );

    }

    dismissLoader(): void {
        let elem = this.loaderElem.nativeElement;
        this.AFS.addClass( elem, 'gHide' );
    }

    getIonisationText( i: any ): any {

        let index: number = parseInt(i) + 1;
        let top: any = ['st', 'nd', 'rd', 'th'];
        let retStr: string = ''

        if (index == 1) {
            retStr = (index + '<sup>' + top[0] +' </sup>' );
        } else if (index == 2) {
            retStr = (index + '<sup>' + top[1] + ' </sup>');
        } else if (index == 3) {
            retStr = (index + '<sup>' + top[2] + ' </sup>');
        } else {
            retStr = (index + '<sup>' + top[3] + ' </sup>');
        }
        //console.log( retStr );
        return retStr;
    }

    getTemprature(i: any): any {

        return 400 + Number(i) * 200;

    }
}
