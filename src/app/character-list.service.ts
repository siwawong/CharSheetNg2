import { Injectable } from '@angular/core';

import { Character } from './character';
import { CHARACTERS } from './mock-characters';

@Injectable()
export class CharacterListService {

  getCharacters() {
    return Promise.resolve(CHARACTERS);
  }
  
  getUserCharacters(username: string) {
    return this.getCharacters()
      .then(allCharacters => allCharacters[username])
      .catch(usersCharacter => usersCharacter = new Array<Character>());
  }  
}
