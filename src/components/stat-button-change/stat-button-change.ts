import { Component } from '@angular/core';
import { EditStatComponent } from '../edit-stat/edit-stat';

import { CharacterStat } from '../../app/models/stat-model';
@Component({
  selector: 'stat-button-change',
  templateUrl: 'stat-button-change.html'
})
export class StatButtonChangeComponent extends EditStatComponent  {
  
  rangeClick(stat: CharacterStat, type: string) {
    if (type === 'PLUS') {
      this.rangeValue += 1;      
    } else {
      this.rangeValue -= 1;      
    }
    this.rangeChange(stat);    
  }
  
}
