import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store }      from '@ngrx/store';

import * as fromRoot from './reducers';
import * as characterStat from './actions/character-stat';
import * as character from './actions/character';

import { CHARACTERSTATS } from './mock-characterstats';
import { CharacterStat } from './models/character-stat';

@Injectable()
export class CharacterStatsService {
  curCharStats: Observable<CharacterStat[]>;
  _id: number = 0;
  constructor(private store$: Store<fromRoot.State>) {
    // add initial set of stats
    CHARACTERSTATS.map(stat => {
      this.store$.dispatch(new characterStat.StatAdd(stat));
    });

    this.curCharStats = this.store$.select(fromRoot.getCharStats);
  }

  addStat(charId: string, name: string, value: number, max: number, type: string) {
    let newStat: CharacterStat = {
      id: this.generateId(),
      name: name,
      value: value,
      maximum: max,
      type: type
    }

    this.store$.dispatch(new characterStat.StatAdd(newStat));

    // link newStat
    this.store$.dispatch(new character.LinkStat({charId: charId, statId: newStat.id}));
  }

  generateId() {
    this._id += 1;
    return this._id.toString();
  }

  getCurrentCharacterStats() {
    return this.curCharStats;
  }

  // TODO: replace with store ACTIONs for gets and sets
  // getCharacterStats(characterName: string) {
  //   // prevent memory leak
  //   if(this.stats !== undefined) {
  //     this.stats.unsubscribe();
  //   }

  //   this.stats = new BehaviorSubject<CharacterStat[]>(CHARACTERSTATS[characterName]);

  //   return this.stats.asObservable();
  // }

  updateStat(newStat: CharacterStat) {
    this.store$.dispatch(new characterStat.StatUpdate(newStat));
  }
}
