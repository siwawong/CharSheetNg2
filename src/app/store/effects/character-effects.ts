import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/withLatestFrom';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import { HttpService } from '../../services/http.service';

import * as CharacterActions from '../actions/character-actions';
import * as NavActions from '../actions/nav-actions';
import * as fromRoot from '../reducers';

@Injectable()
export class CharacterEffects {
    @Effect()
    getAll: Observable<Action> = this.actions$.ofType(CharacterActions.GET_ALL)
        .withLatestFrom(this.store$.select(fromRoot.getAuth), (action, token) => token)
        .switchMap((authToken) => this.http.getCharacters(authToken))
        .map((res) => new CharacterActions.GetAllSuccess(res));

    @Effect()
    createChar: Observable<Action> = this.actions$.ofType(CharacterActions.CREATE)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getAuth), (payload, token) => {
            return {
                token: token,
                name: payload
            };
        })
        .switchMap((payload) => this.http.createCharacter(payload.token, payload.name))
        .mergeMap((res) => {
            let merge = [
                new CharacterActions.CreateSuccess(res),
                new NavActions.Back()            
            ];
            return merge;
        });

    @Effect()
    selectChar: Observable<Action> = this.actions$.ofType(CharacterActions.SELECT)
        // .withLatestFrom(this.store$.select(fromRoot.getUsernameAndChar), (action, obj) => {
        .mergeMap(() => {
            let merge = [
                new CharacterActions.SelectSuccess(),
                new NavActions.CharacterSheet()
            ];
            return merge;
        });

    constructor(private http: HttpService,
                private actions$: Actions,
                private store$: Store<fromRoot.State>) { }
};
