import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { SocialSharing } from '@ionic-native/social-sharing';

@Injectable()
export class SocialshareProvider {

  constructor(public http: Http, private facebook: Facebook, private socialsharing: SocialSharing) {
    console.log('Hello SocialshareProvider Provider');
  }

  async facebookLogin() {
    await this.facebook.login(['public_profile']).then(response => {
      console.log('Facebook login success: ', response);
    }).catch(ex => {
      console.log('Facebook login error: ', ex);
    });
  }

  async getFacebookStatus() {
    await this.facebook.getLoginStatus().then(response => {
      if (response.status == 'connected') {
        // User is logged in and authenticated by the app
        console.log('Facebook connected: ', response);
      }
      else if (response.status = 'not_authorized') {
        // User is logged in but your app is not authorized
        console.log('Facebook not authorized: ', response);
      }
      else {
        // User is logged out of Facebook and your app is not authorized
      }
    }).catch(ex => {
      console.log('Login error: ', ex);
    });
  }

  async shareToFacebook(caption, desc, pict) {
    console.log('URL for image to be sent: ', pict);
    await this.facebook.showDialog({
      method: 'share',
      href: pict,
      picture: pict,
      message: 'Test photo post',
      caption: caption,
      description: desc,
    }).then(response => {
      console.log('Successfully shared: ', response);
    }).catch(ex => {
      console.log('Share error: ', ex)
    });
    // this.facebook.showDialog({
    //   method: 'share',
    //   caption: caption,
    //   description: desc,
    //   picture: pict
    // }, function onShareSuccess (result) {
    //     console.log('Posted');
    // }).catch(ex => {
    //   console.log('Post error: ', ex);
    // });
  }

  async shareFacebookUsingSocialSharing(img) {
    return new Promise(resolve => {
      this.socialsharing.shareViaFacebook(null, img, img).then(response => {
        resolve(response);
      }).catch(ex => {
        resolve(ex);
      });
    });
  }

  async shareInstagramUsingSocialSharing(img) {
    return new Promise(resolve => {
      this.socialsharing.shareViaInstagram(null, img).then(response => {
        resolve(response);
      }).catch(ex => {
        resolve(ex);
      });
    });
  }

  async shareTwitterUsingSocialSharing(img) {
    return new Promise(resolve => {
      this.socialsharing.shareViaTwitter(null, img, img).then(response => {
        resolve(response);
      }).catch(ex => {
        resolve(ex);
      });
    });
  }

  async shareEmailUsingSocialSharing(subject, message, to, cc, bcc, file) {
    return new Promise(resolve => {
      this.socialsharing.shareViaEmail(message, subject, to, cc, bcc, file).then(response => {
        resolve(response);
      }).catch(ex => {
        resolve(ex);
      });
    });
  }
}
