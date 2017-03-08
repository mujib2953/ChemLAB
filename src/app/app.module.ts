import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

// --- Pages
import { CustomSpacerPage } from '../pages/custom-spacer/custom-spacer';
import { DummyPage } from '../pages/dummy/dummy';
import { HomePage } from '../pages/home/home';
import { BeginnerPage } from '../pages/beginner/beginner';
import { IntermediatePage } from '../pages/intermediate/intermediate';
import { MasterPage } from '../pages/master/master';
import { XtremzPage } from '../pages/xtremz/xtremz';
// import { ElementsDetailsPage } from '../pages/elements-details/elements-details';


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


// interface CloudSettings {
//     core: {}
//     // push: PushOptions
//     // database: IonicDBOptions
//     // auth: AuthOptions
//     // insights: InsightsOptions
//     // logger: LoggerOptions
// }

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '50b0c8e3'
  }
};

@NgModule({
    declarations: [
        MyApp,
        CustomSpacerPage,
        DummyPage,
        HomePage,
        BeginnerPage,
        IntermediatePage,
        MasterPage,
        XtremzPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig),
        CloudModule.forRoot(cloudSettings)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        CustomSpacerPage,
        DummyPage,
        HomePage,
        BeginnerPage,
        IntermediatePage,
        MasterPage,
        XtremzPage

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