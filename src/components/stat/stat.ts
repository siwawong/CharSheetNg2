import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../app/store/reducers';
import * as StatActions from '../../app/store/actions/stat-actions';
import { CharacterStat } from '../../app/models/stat-model';

@Component({
  selector: 'stat',
  templateUrl: 'stat.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatComponent {
  @Input() stat: CharacterStat;
  @Input() index: number;

  constructor(private store: Store<fromRoot.State>) {
  }

  selectStat() {
    this.store.dispatch(new StatActions.Select(this.index));
  }

  removeStat() {
    this.store.dispatch(new StatActions.Remove(this.stat.id));
  }

  refresh() {
    this.store.dispatch(new StatActions.Update({
        id: this.stat.id,
        name: this.stat.name,
        value: this.stat.maximum,
        maximum: this.stat.maximum,
        type: this.stat.type
      }));
  }

  getVis(value: number, maximum: number) {
    if (maximum < 1) {
      return false;
    } else if (value >= maximum) {
      return false;
    } else {
      return true;
    }
  }
}
