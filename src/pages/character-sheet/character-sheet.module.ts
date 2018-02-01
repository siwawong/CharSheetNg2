import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CharacterSheetPage } from './character-sheet';
import { StatComponent } from '../../components/stat/stat';
import { StatFormChangeComponent } from '../../components/stat-form-change/stat-form-change';

@NgModule({
  declarations: [
    CharacterSheetPage,
    StatComponent,
    StatFormChangeComponent
  ],
  entryComponents: [CharacterSheetPage, StatComponent, StatFormChangeComponent],
  imports: [
    IonicPageModule.forChild(CharacterSheetPage)
  ],
})
export class CharacterSheetPageModule {}
