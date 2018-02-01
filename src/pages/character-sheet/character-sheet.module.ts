import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CharacterSheetPage } from './character-sheet';
import { StatComponent } from '../../components/stat/stat';

@NgModule({
  declarations: [
    CharacterSheetPage,
    StatComponent
  ],
  entryComponents: [CharacterSheetPage, StatComponent],
  imports: [
    IonicPageModule.forChild(CharacterSheetPage)
  ],
})
export class CharacterSheetPageModule {}
