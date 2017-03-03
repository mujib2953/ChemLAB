import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Dummy page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-dummy',
    templateUrl: 'dummy.html'
})
export class DummyPage {

	pageName: string;

    constructor(
    	public navCtrl: NavController,
    	public navParams: NavParams
	) {
    	this.pageName = this.navParams.get( 'pushData' );
    	console.log( this.pageName );
	}

    ionViewDidLoad() {
        console.log('ionViewDidLoad DummyPage');
    }

}