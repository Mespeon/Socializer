import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';

// Natives
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from '@ionic-native/facebook';
import { SocialSharing } from '@ionic-native/social-sharing';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';

// Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FilenavPage } from '../pages/filenav/filenav';
import { RotationPage } from '../pages/rotation/rotation';

// Providers
import { SocialshareProvider } from '../providers/socialshare/socialshare';

// Modules
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FilenavPage,
    RotationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    ImageCropperModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FilenavPage,
    RotationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SocialshareProvider,
    Facebook,
    SocialSharing,
    File,
    FilePath
  ]
})
export class AppModule {}
