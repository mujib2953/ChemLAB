import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad ReactionPage');
    }

}