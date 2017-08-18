import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CharacterSheetPage } from './character-sheet';

@NgModule({
  declarations: [
    CharacterSheetPage,
  ],
  imports: [
    IonicPageModule.forChild(CharacterSheetPage),
  ],
})
export class CharacterSheetPageModule {}
