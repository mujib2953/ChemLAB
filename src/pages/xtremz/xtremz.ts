import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
Generated class for the Xtremz page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
    selector: 'page-xtremz',
    templateUrl: 'xtremz.html'
})
export class XtremzPage {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad XtremzPage');
    }

}