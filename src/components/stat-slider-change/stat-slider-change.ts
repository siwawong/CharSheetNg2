import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { CharacterStat } from '../../app/models/stat-model';
import * as StatActions from '../../app/store/actions/stat-actions';
import * as fromRoot from '../../app/store/reducers';

const RANGETIMEOUT = 1250;
const EVENTDEBOUNCE = RANGETIMEOUT / 4;

@Component({
  selector: 'stat-slider-change',
  templateUrl: 'stat-slider-change.html'
})
export class StatSliderChangeComponent {
  @Input() stat: CharacterStat;
  @Input() index: number;

  private timeoutRef;
  private rangeValue: number;
  private rangeMax: number;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.calcRange(this.stat);
  }

  calcRange(stat: CharacterStat) {
    this.rangeMax = stat.maximum;
    this.rangeValue = stat.value;
  }

  rangeChange(stat: CharacterStat) {
    clearInterval(this.timeoutRef);
    this.timeoutRef = setInterval(() => {
      this.rangeEnd(stat);
    }, RANGETIMEOUT);
  }

  rangeEnd(stat: CharacterStat) {
    clearInterval(this.timeoutRef);
    const newStat =  {id: stat.id, name: stat.name, value: this.rangeValue, maximum: stat.maximum, type: stat.type};
    this.store.dispatch(new StatActions.Update(newStat));
  }
  
  rangeClick(stat: CharacterStat, type: string) {
    if (type === 'PLUS') {
      this.rangeValue += 1;      
    } else {
      this.rangeValue -= 1;      
    }
    this.rangeChange(stat);    
  }

}
