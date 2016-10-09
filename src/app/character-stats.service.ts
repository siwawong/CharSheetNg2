import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CHARACTERSTATS } from './mock-characterstats';
import { CharacterStat } from './character-stat';

@Injectable()
export class CharacterStatsService {
  stats: BehaviorSubject<CharacterStat[]>;

  constructor() {}

  // TODO: replace with store ACTIONs for gets and sets
  getCharacterStats(characterName: string) {
    // prevent memory leak
    if(this.stats !== undefined) {
      this.stats.unsubscribe();
    }

    this.stats = new BehaviorSubject<CharacterStat[]>(CHARACTERSTATS[characterName]);

    return this.stats.asObservable();
  }

  updateStat(characterName: string, newStat: CharacterStat) {
    CHARACTERSTATS[characterName] = CHARACTERSTATS[characterName].map(stat => {
      return (stat.id === newStat.id) ? newStat : stat;
    });

    this.stats.next(CHARACTERSTATS[characterName]);
  }
}
