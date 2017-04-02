import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// --- services
import { AngularFireService } from '../../providers/angular-fire-service';

/*
  Generated class for the KnowUs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-know-us',
    templateUrl: 'know-us.html'
})
export class KnowUsPage {

	pageObj: any = {
		activeTab: 'about-us'
	};

    constructor(
    	public navCtrl: NavController,
    	public navParams: NavParams,

    	public AFS: AngularFireService
	) {

    	this.pageObj.developer = this.AFS.getDeveloper();

	}

    ionViewDidLoad() {
        console.log('ionViewDidLoad KnowUsPage');
    }

}