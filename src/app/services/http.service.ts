import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';

import { User } from '../models/user';
import { Character } from '../models/character';
import { CharacterStat } from '../models/character-stat';

@Injectable()
export class HttpService {

  constructor(private http: Http) { }

  // Add Check Email Availability
  createUser(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${environment.getUrl()}Users`, {name, email, password})
      .map((response: Response) => {
        let toReturn = response.json();
        toReturn.authToken = response.headers.get('x-auth');
        return toReturn;
        // console.log(toReturn);
      }).catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  login(email: string, password: string): Observable<any> {
    console.log('Login');
    return this.http.post(`${environment.getUrl()}Users/Me`, { email, password })
      .map((response: Response) => {
        console.log('response');
        let toReturn = response.json();
        toReturn.authToken = response.headers.get('x-auth');
        return toReturn;
      }).catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  logout(authToken: string): Observable<boolean> {
    console.log(authToken);
    return this.http.delete(`${environment.getUrl()}Users/Me`, this.createAuthHeader(authToken))
      .map((response: Response) => {
        return true;
      }).catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  getCharacters(authToken: string): Observable<Character[]> {
    return this.http.get(`${environment.getUrl()}Users/Characters`, this.createAuthHeader(authToken))
      .map((response: Response) => {
        let responseJson = response.json();
        // array [_id, charNames]
        return response.json().map((resChar) => {
          return {
            id: resChar._id,
            name: resChar.name,
            stats: []
          };
        });
      }).catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  createCharacter(authToken: string, characterName: string): Observable<Character> {
    // returns character id
    return this.http.post(`${environment.getUrl()}Users/Characters`, { name: characterName }, this.createAuthHeader(authToken))
      .map((response: Response) => {
        let toReturn = response.json();
        return {
          id: toReturn,
          name: characterName,
          stat: []
        };
      }).catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  getCharacterById(authToken: string, characterId: string): Observable<Character> {
    return this.http.get(`${environment.getUrl()}Users/Characters/${characterId}`, this.createAuthHeader(authToken))
      .map((response: Response) => {
        // return Character
        let toReturn = response.json();
        return {
          id: toReturn._id,
          name: toReturn.name,
          stats: toReturn.stats
        };
      }).catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  createCharacterStat(authToken: string, characterId: string, newStat: CharacterStat) {
    this.http.post(`${environment.getUrl()}Users/Characters/Stats/`, { _id: characterId, ...newStat }, this.createAuthHeader(authToken))
        .map((response: Response) => {
          // return Character.[stats]
          return response.json();
        }).catch((error: Response) => {
          return Observable.throw(error);
        });
  }

  // patchCharacterStat(currUser: User, currCharacter: Character, currStat: CharacterStat) {
  //   this.http.patch(
  //     `${environment.getUrl()}Users/Characters/Stats/`,
  //     { _id: currCharacter.id, ...currStat },
  //     this.createAuthHeader(currUser.authToken))
  //       .map((response: Response) => {
  //         // return Character.[stats]
  //       }).catch((error: Response) => {
  //         return Observable.throw(error);
  //       });
  // }

  // deleteCharacterStat(currUser: User, currCharacter: Character, currStat: CharacterStat) {
  //   // rewrite server api to not expect json object
  //   this.http.delete(
  //     `${environment.getUrl()}Users/Characters/${currCharacter.id}/Stats/${currStat.name}`,
  //     this.createAuthHeader(currUser.authToken))
  //       .map((response: Response) => {
  //         // return Character.[stats]
  //       }).catch((error: Response) => {
  //         return Observable.throw(error);
  //       });
  // }

  createAuthHeader(authToken: string) {
    const header = new Headers({'x-auth': authToken});
    return new RequestOptions({ headers: header});
  }
};
