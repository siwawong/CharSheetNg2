import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Character } from './models/character';
import { CHARACTERS } from './mock-characters';

@Injectable()
export class CharacterListService {  
  characters: BehaviorSubject<Character[]>;
  _mutable_characters: Character[];
  _temp_id_count: number = 0;

  constructor() {
    this._mutable_characters = CHARACTERS;
    this.characters = new BehaviorSubject<Character[]>(this._mutable_characters);
  }
  
  getCharacter(character: Character) {
    return this._mutable_characters.find(char => char.id === character.id);
  }

  getUserCharacters(username: string) {
    // at the moment, username is not actually being used to fetch the correct set of characters.
    // TODO: implement filter on server side 
    // for now assuming one character
    return this.characters.asObservable();
  }

  addCharacter(characterName: string) {
    let character = {
      id: this._temp_id_count.toString(),
      name: characterName,
      url: '',
    }

    // this._mutable_characters = [
    //   ...this._mutable_characters,
    //   character
    // ];

    this.characters.next(this._mutable_characters);
    this._temp_id_count += 1;
  }

  updateCharacter(character: Character) {
    this._mutable_characters = this._mutable_characters.map(char => {
      if(char.id === character.id) {
        return character;
      } else {
        return char;
      }
    });

    this.characters.next(this._mutable_characters);
  }

  removeCharacter(character: Character) {
    this._mutable_characters = 
      this._mutable_characters.filter(char => char.id !== character.id);

    this.characters.next(this._mutable_characters);
  }
}
