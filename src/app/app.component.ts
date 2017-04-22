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
            }

            this.loadJSON( function(){
                Splashscreen.hide();
            } );
        });
    }

    loadJSON( p_fCallback: any ): void {

        let scope: any = this;

        if( typeof(Storage) !== "undefined" && localStorage.getItem( "allElements" ) == undefined ) {
            scope.AFS.put( ' Loading from DB ' );
            this.AFS.elementsList.subscribe( data => {
                scope.AFS.elmList = data;

                localStorage.setItem("allElements", JSON.stringify( data ) );

                if( p_fCallback )
                    p_fCallback();
            } );

        } else {
            scope.AFS.put( ' Loading from Local Storage ' );
            scope.AFS.elmList = JSON.parse( localStorage.getItem( "allElements" ) );

            if( p_fCallback )
                p_fCallback();
        }
        console.log( scope.AFS.elmList );

    }
}