import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilenavPage } from './filenav';

@NgModule({
  declarations: [
    FilenavPage,
  ],
  imports: [
    IonicPageModule.forChild(FilenavPage),
  ],
})
export class FilenavPageModule {}
