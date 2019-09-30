import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { SocialshareProvider } from './../../providers/socialshare/socialshare';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  samplePicUrl = 'https://raw.githubusercontent.com/Mespeon/Sibyl-S2-Backend/master/psychopass/resources/cover/nozomi-cover.jpg';
  sampleCaption = 'Nozomi best gurl!';
  sampleDescription = 'Solche titten';

  constructor(public navCtrl: NavController, public socialProvider: SocialshareProvider, public toasty: ToastController) {

  }

  ionViewDidLoad() {
    console.log('View entered.');
  }

  showToast(message) {
    var options = {
      message: message,
      duration: 3000,
      position: "bottom"
    }
    this.toasty.create(options).present();
  }

  async getFacebookStatus() {
    await this.socialProvider.getFacebookStatus().then(response => {
      console.log('Facebook status: ', response);
    }).catch(ex => {
      console.log('Something went wrong getting FB status: ', ex);
    });
  }

  async logintoFacebook() {
    this.socialProvider.facebookLogin().then(response => {
      console.log('Facebook login: ', response);
    }).catch(ex => {
      console.log('Something went wrong logging into FB: ', ex);
    });
  }

  async shareToFacebook(caption, desc, picture) {
    console.log('Data to send: ', caption, desc, picture);

    this.socialProvider.shareToFacebook(caption, desc, picture).then(response => {
      console.log('Share to Facebook: ', response);
    }).catch(ex => {
      console.log('Something went wrong in sharing with FB: ', ex);
    });
  }

  async fbShareUsingSocialShare(img) {
    await this.socialProvider.shareFacebookUsingSocialSharing(img).then(response => {
      console.log('SocialShare: ', response);
      this.showToast('Shared to Facebook.');
    }).catch(ex => {
      console.log('Something went wrong with social share: ', ex);
    });
  }

  async igShareUsingSocialShare(img) {
    await this.socialProvider.shareInstagramUsingSocialSharing(img).then(response => {
      console.log('Instagram share: ', response);
    }).catch(ex => {
      console.log(ex);
    });
  }

  async twShareUsingSocialShare(img) {
    await this.socialProvider.shareTwitterUsingSocialSharing(img).then(response => {
      console.log('Twitter share: ', response);
    }).catch(ex => {
      console.log(ex);
    });
  }

  async emailShareUsingSocialShare(img) {
    var subject = 'Check out my new outfit in GetStylin!';
    var message = 'This took me a while to perfect, but look at it!';
    var to = ['mark.nolledo@gmail.com'];
    var cc = null;
    var bcc = null;
    var file = img;
    await this.socialProvider.shareEmailUsingSocialSharing(subject, message, to, cc, bcc, file).then(response => {
      console.log('Email share: ', response);
      this.showToast('Shared via email.');
    }).catch(ex => {
      console.log(ex);
    });
  }
}
