import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Character } from './character';
import { CHARACTERS } from './mock-characters';

@Injectable()
export class CharacterListService {  
  characters: BehaviorSubject<Character[]>;

  constructor() {
    this.characters = new BehaviorSubject<Character[]>(CHARACTERS);
  }

  getCharacters() {
    return this.characters.asObservable();
  }
  
  getUserCharacters(username: string) {
    // at the moment, username is not actually being used to fetch the correct set of characters.
    // for now assuming one character
    return this.getCharacters();
  }  
}