import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store }      from '@ngrx/store';

import { Character }  from './models/character';
import { CHARACTERS } from './mock-characters';

import * as fromRoot  from './reducers';
import * as character from './actions/character';
import * as user      from './actions/users';

import { LoginService } from './login.service';

@Injectable()
export class CharacterListService {
  _characters: Character[];
  _selectedUserId: string;
  characters: Observable<Character[]>;
  selectedCharacter: Observable<Character>;
  _temp_id_count: number = 0;

  constructor(private store$: Store<fromRoot.State>, private loginService: LoginService) {
    // add characters - temp
    CHARACTERS.map(char => {
      this.store$.dispatch(new character.Add(char));
    });

    // keep the current user around
    this.store$.let(fromRoot.getSelectedUserId).subscribe(id => this._selectedUserId = id);

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
    if(this._selectedUserId !== undefined) {
      let newCharacter: Character = {
        id: this.generateCharacterId.toString(),
        name: characterName,
        url: characterName,
        statIds: []
      };

      this.store$.dispatch(new character.Add(newCharacter));
      // link the new character to the current user
      this.store$.dispatch(new user.LinkChar({userKey: this._selectedUserId , charKey: newCharacter.id}));
    }

    
  }

  validateCurrentCharacter(name: string) {
    let char = this._characters.find(char => char.name === name);

    if (char) {
      this.store$.dispatch(new character.Select(char.id));
    }
  }

  updateCharacter(char: Character) {
    this.store$.dispatch(new character.Update(char));
  }

  removeCharacter(char: Character) {
    this.store$.dispatch(new character.Remove(char.id));
  }
}
