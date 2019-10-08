import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';

import { File, IWriteOptions } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';

@IonicPage()
@Component({
  selector: 'page-filenav',
  templateUrl: 'filenav.html',
})
export class FilenavPage {
  blob: any;
  filename: any;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private file: File,
    private filePath: FilePath
  ) {
    this.blob = this.navParams.get('data') ? this.navParams.get('data') : null;
    this.filename = this.navParams.get('filename') ? this.navParams.get('filename') : null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilenavPage');
    this.detectFilesystem();
  }

  // Simply detect the file system
  detectFilesystem() {
    this.file.getFreeDiskSpace().then(response => {
      console.log('Disk space: ', response);
      console.log('Data (app) directory: ', this.resolveNativeFilePath(this.file.dataDirectory));
      console.log('External Data directory: ', this.resolveNativeFilePath(this.file.externalDataDirectory));
      console.log('External Root Data directory: ', this.resolveNativeFilePath(this.file.externalRootDirectory));
    }).catch(ex => {
      console.log('Error: ', ex);
    }).then(() => {
      this.createFolder('GetStylin');
    });
  }

  // Resolve native file path (returns undefined tho)
  resolveNativeFilePath(path) {
    if (this.platform.is('android')) {
      console.log('Platform is Android.');
      this.filePath.resolveNativePath(path).then(response => {
        return ({resolved: response, unresolved: path});
      }).catch(ex => {
        return ({error: 'NativeFilePath', trace: ex});
      });
    }
    else {
      console.log('Platform is not Android.');
      return (path);
    }
  }

  // Create app data directory in specified location.
  // Will check first if the directory exists; if true, do nothing;
  // if false, create the directory. This will also chain the createFile request
  // if the Promise returns an isExisting response.
  async createFolder(name) {
    let sdcard = this.file.externalRootDirectory; // maps to the sdcard (internal) directory (at least for Android)
    console.log(sdcard, name);

    // Check if the folder exists first
    let path = sdcard + name;
    console.log('Checking folder existence...');
    await this.file.checkDir(sdcard, name).then(response => {
      // This promise will reject if the directory is non-existing, hence
      // we could safely assume that if it returns a non-error response, this
      // means that the directory exists. We could chain the createFile function
      // here, but we only call it if and only if the blob and filename are received by
      // the controller. These two must always be sent together before a file could be
      // created. If no blob or filename is received, simply do nothing.
      if (response) {
        console.log(path, ': directory exists.');

        // Chain the file write if the blob and filename are not null.
        if (!this.blob && !this.filename) {
          console.log('Nothing to write.');
        }
        else {
          // The actual create/write file function
          this.createFile(path, this.blob, this.filename);
        }
      }
    }).catch(ex => {
      // If the checkDir Promise rejects, create the directory under the path
      // specified using the name given. This will only be called if the checkDir
      // Promise is rejected, and the createDir Promise itself also rejects itself
      // if the directory is already existing in the given path.
      console.log('Error caught: ', ex);
      if (ex['code'] == 1) {
        console.log('Directory not existing.');
      }

      // The createDirectory function
      console.log('Creating directory.');
      this.file.createDir(sdcard, name, false).then(response => {
        console.log(response);
      }).catch(ex => {
        console.log('Error creating directory at specified location: ', ex);
      });
    });
  }

  // Writes the image (data) blob to a file at the specified storage path.
  // This function is only called if and only if both the blob and filename are received
  // by the controller/provider. Otherwise, the function will not be called.
  async createFile(path, fileData, fileName) {
    console.log('Creating file with the following params: ', path, fileData, fileName);
    let options: IWriteOptions = { replace: true };

    // Write to the specified path.
    console.log('Saving file...');
    await this.file.writeFile(path, fileName, fileData, options).then(response => {
      // this.storeImage(name); // used to store in Storage; temporarily unused.
      console.log(response);
      console.log('File name: ', response['name']);
      console.log('File full path: ', response['fullPath']);
      console.log('File native URL: ', response['nativeURL']);
      this.dismiss(response['nativeURL']);
    }).catch(ex => {
      console.log('Error saving file: ', ex);
    });
  }

  // Dismiss this modal along with the path of the saved file.
  dismiss(pathToSend) {
    let paramReturn = { path: pathToSend };
    this.viewCtrl.dismiss(paramReturn);
  }
}
