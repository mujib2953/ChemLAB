import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';

// --- services
import { AngularFireService } from '../../providers/angular-fire-service';

// --- Components
import { BgComponent } from '../../components/bg-comp/bg-comp';

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

    @ViewChild(Slides) slides: Slides;
    @ViewChild( 'slideContainer' ) slideContainer: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,

        public AFS: AngularFireService
    ) {
        this.pageObj.developer = this.AFS.getDeveloper();
        this.pageObj.refrences = this.AFS.getRefrences();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad KnowUsPage');
    }

    /*
    * on Slider's slide event 
    */
    slideChanged(): void {
        let currentIndex = this.slides.getActiveIndex();
        if( currentIndex == 0 )
            this.pageObj.activeTab = 'about-us';
        else
            this.pageObj.activeTab = 'refrence';
        
        this.slideToTop();
    }

    /*
    * On Slider's Headr clicked
    * Params <string>:: Header's name which is cliked
    */
    tabChanged( p_tabName: string ): void {
        let goToNumber: number = 0;
        this.pageObj.activeTab = p_tabName;

        if( p_tabName == 'about-us')
            goToNumber = 0;
        else
            goToNumber = 1;

        this.slideToTop();
        this.slides.slideTo(goToNumber, 500);
    }

    /*
    * On every-time when slider changed or header clicked
    * the content of the 'slideContainer' slides to topl
    */
    slideToTop(): void {
        this.slideContainer.nativeElement.scrollTop = '0';
    }

}