import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';

// --- services
import { AngularFireService } from '../providers/angular-fire-service';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage = HomePage;

    constructor(
        platform: Platform,

        // --- custom services
        public AFS: AngularFireService
    ) {
        platform.ready().then(() => {

            if( platform.is( 'cordova' ) ) {
                // Okay, so the platform is ready and our plugins are available.
                // Here you can do any higher level native things you might need.
                StatusBar.styleDefault();

                /*
                * On device ready calling service function to load JSON data
                */
                this.AFS.getAllElementList( function(){
                    Splashscreen.hide();
                } );
            }

            
        });
    }

    
}