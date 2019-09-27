import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Injectable()
export class SocialshareProvider {

  constructor(public http: Http, private facebook: Facebook) {
    console.log('Hello SocialshareProvider Provider');
  }

  // facebookLogin() {
  //   this.facebook.login(['public_profile']).then(response => {
  //     console.log('Facebook login success: ', response);
  //   }).catch(ex => {
  //     console.log('Facebook login error: ', ex);
  //   });
  // }
  //
  // getFacebookStatus() {
  //   this.facebook.getLoginStatus().then(response => {
  //     if (response.status == 'connected') {
  //       // User is logged in and authenticated by the app
  //       console.log('Facebook connected: ', response);
  //     }
  //     else if (response.status = 'not_authorized') {
  //       // User is logged in but your app is not authorized
  //       console.log('Facebook not authorized: ', response);
  //     }
  //     else {
  //       // User is logged out of Facebook and your app is not authorized
  //     }
  //   }).catch(ex => {
  //     console.log('Login error: ', ex);
  //   });
  // }
  //
  // shareToFacebook(caption, desc, pict) {
  //   this.facebook.showDialog({
  //     method: 'share',
  //     caption: caption,
  //     description: desc,
  //     picture: pict
  //   }, function onShareSuccess (result) {
  //       console.log('Posted');
  //   }).catch(ex => {
  //     console.log('Post error: ', ex);
  //   });
  // }

}
