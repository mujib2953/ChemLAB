import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BeginnerPage } from '../pages/beginner/beginner';
import { ElementsDetailsPage } from '../pages/elements-details/elements-details';
import { DummyPage } from '../pages/dummy/dummy';

// ---- Custom Services
import { AngularFireService } from '../providers/angular-fire-service';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';

// AF2 Settings
export const firebaseConfig = {
    apiKey: "AIzaSyAGTwZIbcgCToM49vt4W2GYfWH1XsF7644",
    authDomain: "test-3823e.firebaseapp.com",
    databaseURL: "https://test-3823e.firebaseio.com",
    storageBucket: "test-3823e.appspot.com",
    messagingSenderId: "549062744875"
};


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        BeginnerPage,
        ElementsDetailsPage,
        DummyPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        BeginnerPage,
        ElementsDetailsPage,
        DummyPage
    ],
    providers: [
        {
            provide: ErrorHandler,
            useClass: IonicErrorHandler
        },
        AngularFireService
    ]
})
export class AppModule {}