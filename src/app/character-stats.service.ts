import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { CHARACTERSTATS } from './mock-characterstats';

@Injectable()
export class CharacterStatsService {

  constructor() { }

  getCharacterStats(characterName: string) {
    return Observable.create(observer => {
      observer.next(CHARACTERSTATS[characterName]);
    });
  }
}
