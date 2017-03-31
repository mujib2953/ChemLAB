import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams
	) {
		this.element = this.navParams.get( 'urlData' )
		console.log( this.element );
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ElementsDetailsPage');
	}

	showHelp( type: string ): void {
		console.log( type );
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
