import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';

@IonicPage()
@Component({
  selector: 'page-filenav',
  templateUrl: 'filenav.html',
})
export class FilenavPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private file: File,
    private filePath: FilePath
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilenavPage');
    this.detectFilesystem();
  }

  detectFilesystem() {
    this.file.getFreeDiskSpace().then(response => {
      console.log('Disk space: ', response);
    }).catch(ex => {
      console.log('Error: ', ex);
    });
  }

}
