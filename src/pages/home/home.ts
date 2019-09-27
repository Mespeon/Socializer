import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SocialshareProvider } from './../../providers/socialshare/socialshare';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  samplePicUrl = 'https://raw.githubusercontent.com/Mespeon/Sibyl-S2-Backend/master/psychopass/resources/cover/nozomi-cover.jpg';
  sampleCaption = 'Nozomi best gurl!';
  sampleDescription = 'Solche titten';
  
  constructor(public navCtrl: NavController, public socialShareProvider: SocialshareProvider) {

  }

  ionViewDidLoad() {
    console.log('View entered.');
  }



}
