import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store }      from '@ngrx/store';

import { Character } from './models/character';
import { CHARACTERS } from './mock-characters';
import * as fromRoot from './reducers';
import * as character from './actions/character';

@Injectable()
export class CharacterListService {
  _characters: Character[];
  characters: Observable<Character[]>;
  selectedCharacter: Observable<Character>;
  _temp_id_count: number = 0;

  constructor(private store$: Store<fromRoot.State>) {
    // add characters - temp
    CHARACTERS.map(char => {
      this.store$.dispatch(new character.CharAdd(char));
    });
    this.characters = this.store$.let(fromRoot.getChars);
    this.characters.subscribe(chars => {
      this._characters = chars;
    });
  }

  getCharacter(charId: string): Observable<Character> {
    return this.store$.let(fromRoot.getCharEntities)
                 .map(entities => entities[charId])
  }

  generateCharacterId(): number {
    this._temp_id_count += 1;

    return this._temp_id_count;
  }

  getUserCharacters() {
    return this.store$.let(fromRoot.getUserCharacters);
  }

  addCharacter(characterName: string) {
    let newCharacter: Character = {
      id: this.generateCharacterId.toString(),
      name: characterName,
      url: '',
      statIds: []
    }    
    this.store$.dispatch(new character.CharAdd(newCharacter));
  }

  validateCurrentCharacter(name: string) {
    let char = this._characters.find(char => char.name === name);

    if (char) {
      this.store$.dispatch(new character.CharSelect(char.id));
    }
  }

  updateCharacter(char: Character) {
    this.store$.dispatch(new character.CharUpdate(char));
  }

  removeCharacter(char: Character) {
    this.store$.dispatch(new character.CharRemove(char.id));
  }
}
