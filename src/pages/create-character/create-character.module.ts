import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateCharacterPage } from './create-character';

@NgModule({
  declarations: [
    CreateCharacterPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateCharacterPage),
  ],
})
export class CreateCharacterPageModule {}
