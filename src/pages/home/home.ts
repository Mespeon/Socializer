import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform, ActionSheetController, LoadingController, ToastController, ModalController } from 'ionic-angular';

import { SocialshareProvider } from './../../providers/socialshare/socialshare';

import { FilenavPage } from './../filenav/filenav';

// import { Caman } from 'caman';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('imageResult') private imageResult: ElementRef; // reference to DOM element
  @ViewChild('myCanvas') private myCanvas: ElementRef;

  samplePicUrl = 'https://raw.githubusercontent.com/Mespeon/Sibyl-S2-Backend/master/psychopass/resources/cover/nozomi-cover.jpg';
  sampleSrc = "./../../assets/imgs/sagiri.jpeg";
  // sampleSrc = "./../../assets/imgs/fur.jpg";
  sampleCaption = 'Nozomi best gurl!';
  sampleDescription = 'Solche titten';

  image: string = '';
  _zone: any;

  brightness: number = 0;
  contrast: number = 35;
  unsharpMask: any = { radius: 0, strength: 0 };
  hue: number = 0;
  saturation: number = 35;

  showEditFilters: boolean = false;

  constructor(public navCtrl: NavController,
    public socialProvider: SocialshareProvider,
    public toasty: ToastController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public actionsheetCtrl: ActionSheetController,
    public modalCtrl: ModalController
  ) {
    this._zone = new NgZone({ enableLongStackTrace: false });
  }

  ionViewDidLoad() {
    console.log('View entered.');
    // Caman('#image', function() {
    //   this.exposure(-10);
    //   this.render(function() {
    //     // var image = document.getElementById('image');
    //     // var canvas = document.getElementById('myCanvas');
    //     // console.log(image, canvas);
    //   });
    // });
  }

  // Used for file traversal
  filepath: any;
  async pushFilePage(params) {
    let fileModal = await this.modalCtrl.create(FilenavPage, params);
    fileModal.onWillDismiss(response => {
      // This modal will return the local file path to the recently stored file.
      // This path will be used to attach the image to the Social Sharing plugin.
      console.log('Received from modal: ', response);
      this.filepath = response['path']; // assign the path to a variable so it could be used by the social functions
    });
    await fileModal.present();
    // this.navCtrl.push(FilenavPage);
  }

  // Calls the filter function
  filterMe() {
    this.filter(this.myCanvas.nativeElement.src);
  }

  // Reset the image in the canvas.
  restoreImage() {
    console.log('Clearing filters.');
    this.imageResult.nativeElement.src = this.image;
    this.myCanvas.nativeElement.src = this.image;
  }

  // Apply the filter to the given image and then convert it to a canvas.
  filter(image) {
    console.log('Original image: ', this.image);
    /// Initialization of glfx.js
    /// is important, to use js memory elements
    /// access to Window element through (<any>window)
    try {
      var canvas = (<any>window).fx.canvas();
    } catch (e) {
      alert(e);
      return;
    }

    /// taken from glfx documentation
    var imageElem = this.imageResult.nativeElement; // another trick is acces to DOM element
    var texture = canvas.texture(imageElem);

    /// filters applied to clean text
    canvas.draw(texture)
      .hueSaturation(this.hue / 100, this.saturation / 100)//grayscale
      .unsharpMask(this.unsharpMask.radius, this.unsharpMask.strength)
      .brightnessContrast(this.brightness / 100, this.contrast / 100)
      .update();

    /// replace image src
    imageElem.src = canvas.toDataURL('image/png');

    // this.downloadImage(canvas);
    this.saveImage(canvas);
  }

  // This will copy the img src to the canvas.
  copySrcToCanvas() {
    this.image = this.imageResult.nativeElement.src;
    var imagery = this.imageResult.nativeElement;
    var canvas = this.myCanvas.nativeElement;
    var canvasData = this.myCanvas;
    console.log(imagery, canvas, canvasData);

    imagery.parentNode.insertBefore(canvas, imagery);
    canvas.width = imagery.width / 2;
    canvas.height = imagery.height / 2;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(imagery, 0, 0);

    var imgData = ctx.getImageData(0,0, canvas.width, canvas.height);
    ctx.putImageData(imgData, 0, 0);
  }

  downloadImage(image) {
    // Direct download
    var link = document.createElement('a');
    link.download = 'somephoto.png';
    link.href = image.toDataURL('image/png');

    console.log(link.download, link.href, image);

    link.click();
  }

  // Save image to storage
  saveImage(image) {
    var dataUrl = image.toDataURL();
    console.log('Image canvas: ', image);
    console.log('Image data: ', dataUrl);

    let name = new Date().getTime() + '.png';
    console.log('Filename: ', name);

    // let path = this.file.dataDirectory;
    // let options: IWriteOptions = { replace: true };

    var data = dataUrl.split(',')[1];
    let blob = this.b64toBlob(data, 'image/png');
    console.log('Blob data: ', blob);

    let params = { data: blob, filename: name };
    // this.navCtrl.push(FilenavPage, params);
    this.pushFilePage(params);

    // var link = document.createElement('a');
    // link.download = name;
    // link.href = dataUrl;
    // link.click();

    // Write the file to storage
    // MOVE THIS TO A SEPARATE CONTROLLER FOR NOW.
    // this.file.writeFile(path, name, blob, options).then(response => {
    //   // this.storeImage(name);
    //   console.log('Saving file...');
    // }).catch(ex => {
    //   console.log('Error saving file: ', ex);
    // });
  }

  // Converts the dataURL to a blob before being written into an actual file.
  // This step is required, and is connected with the saveImage function.
  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  showToast(message) {
    var options = {
      message: message,
      duration: 3000,
      position: "bottom"
    }
    this.toasty.create(options).present();
  }

  // SOCIAL
  // SHARING
  // FUNCTIONS
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
