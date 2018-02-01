import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CharacterSheetPage } from './character-sheet';
import { StatComponent } from '../../components/stat/stat';
import { StatFormChangeComponent } from '../../components/stat-form-change/stat-form-change';
import { StatSliderChangeComponent } from '../../components/stat-slider-change/stat-slider-change';

@NgModule({
  declarations: [
    CharacterSheetPage,
    StatComponent,
    StatFormChangeComponent,
    StatSliderChangeComponent
  ],
  entryComponents: [CharacterSheetPage, StatComponent, StatFormChangeComponent, StatSliderChangeComponent],
  imports: [
    IonicPageModule.forChild(CharacterSheetPage)
  ],
})
export class CharacterSheetPageModule {}
