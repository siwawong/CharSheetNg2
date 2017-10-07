import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from '../models/user-model';
import { Character } from '../models/character-model';
import { CharacterStat } from '../models/stat-model';
import { ENVIRONMENT } from '../../environments/environment.default';

@Injectable()
export class HttpService {

  constructor(private http: Http, private ionicHttp: HTTP) {
      this.ionicHttp.enableSSLPinning(true).then(
        () => { /* success */ }, 
        () => { /* fail */} //
    );
  }

  // Add Check Email Availability
  createUser(name: string, email: string, password: string): Observable<any> {
    console.log(`${name}, ${email}, ${password}`);
    return this.http.post(`${this.getUrl()}Users`, {name, email, password})
      .map((response: Response) => {
        let toReturn = response.json();
        toReturn.authToken = response.headers.get('x-auth');
        return toReturn;
        // console.log(toReturn);
      });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.getUrl()}Users/Me`, { email, password })
      .map((response: Response) => {
        let toReturn = response.json();
        toReturn.authToken = response.headers.get('x-auth');
        return toReturn;
      });
  }

  logout(authToken: string): Observable<boolean | any> {
    return this.http.delete(`${this.getUrl()}Users/Me`, this.createAuthHeader(authToken))
      .map((response: Response) => {
        return true;
      });
  }

  getCharacters(authToken: string): Observable<Character[]> {
    console.log('Get Char Called');
    return this.http.get(`${this.getUrl()}Users/Characters`, this.createAuthHeader(authToken))
      .map((response: Response) => {
        let responseJson = response.json();
        // array [_id, charNames]
        return response.json().map((resChar) => {
          return {
            id: resChar._id,
            name: resChar.name,
            // stats: []
          };
        });
      });
  }

  createCharacter(authToken: string, charId: string, characterName: string): Observable<Character | any> {
    return this.http.post(`${this.getUrl()}Users/Characters`, { name: characterName, cid: charId }, this.createAuthHeader(authToken))
      .map((response: Response) => {
        let toReturn = response.json();
        // return {
        //   id: toReturn,
        //   name: characterName,
        // };
        console.log(toReturn);
      });
  }

  getCharacterStats(authToken: string, charId: string): Observable<CharacterStat[]> {
    return this.http.get(`${this.getUrl()}Users/Characters/${charId}`, this.createAuthHeader(authToken))
      .map((response: Response) => {
        // return Character
        let toReturn = response.json();
        return toReturn;
      });
  }

  createCharacterStat(authToken: string, charId: string, newStat: CharacterStat): Observable<any> {
    // console.log(`${authToken}, ${characterId}, ${newStat}`);
    return this.http.post(
      `${this.getUrl()}Users/Characters/Stats/`, { cid: charId, ...newStat }, this.createAuthHeader(authToken))
        .map((response: Response) => {
          // return Character.[stats]
          // console.log(response.json());
          return response.json();
        });
  }

  patchCharacterStat(auth: string, charId: string, stat: CharacterStat): Observable<CharacterStat> {
    return this.http.patch(
      `${this.getUrl()}Users/Characters/Stats/`,
      { cid: charId, ...stat },
      this.createAuthHeader(auth))
        .map((response: Response) => {
          // return Character.[stats]
          return response.json();
        });
  }

  deleteCharacterStat(auth: string, charId: string, statId: string): Observable<boolean | any> {
    // rewrite server api to not expect json object
    return this.http.delete(
      `${this.getUrl()}Users/Characters/${charId}/Stats/${statId}`,
      this.createAuthHeader(auth))
        .map((response: Response) => {
          // return Character.[stats]
          return true;
        });
  }

  deleteCharacterStats(auth: string, charId: string): Observable<boolean | any> {
    return this.http.delete(
      `${this.getUrl()}Users/Characters/${charId}/Stats`, this.createAuthHeader(auth))
        .map((response: Response) => {
          return true;
        });
  }

  createAuthHeader(authToken: string) {
    const header = new Headers({'x-auth': authToken});
    return new RequestOptions({ headers: header});
  }

  getUrl = () => {
    return `https://${ENVIRONMENT.database.host}:${ENVIRONMENT.database.port}/`;
  };
};
