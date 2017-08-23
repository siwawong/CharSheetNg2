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
import { StorageService } from '../../services/storage.service';

import * as CharacterActions from '../actions/character-actions';
import * as NavActions from '../actions/nav-actions';
import * as fromRoot from '../reducers';

@Injectable()
export class CharacterEffects {
    @Effect()
    loadMany: Observable<Action> = this.actions$.ofType(CharacterActions.LOAD_MANY)
        .map(() => {
            let newAction;
            const newCharState = this.storage.getCharacterState();

            if (newCharState === null) {
                newAction = new CharacterActions.LoadManyNetwork();
            } else {
                newAction = new CharacterActions.LoadManySuccess(newCharState);
            }
            return newAction;
        });

    @Effect()
    loadManyNet: Observable<Action> = this.actions$.ofType(CharacterActions.LOAD_MANY_NETWORK)
        .withLatestFrom(this.store$.select(fromRoot.getAuth), (action, token) => token)
        .switchMap((authToken) => this.http.getCharacters(authToken))
        .map((res) => {
            return new CharacterActions.LoadManyNetworkSuccess(res);
            // SAVE MANY ADDED HERE? new CharacterActions.SaveMany(res)
        });

    @Effect()
    createChar: Observable<Action> = this.actions$.ofType(CharacterActions.ADD)
        .withLatestFrom(this.store$.select(fromRoot.getLatestChar), (action, char) => char)
        .mergeMap((char) => {
            this.storage.setCharacterState(char);
            // logic for when to update network goes here?
            let merge = [
                new CharacterActions.AddNetwork(char),
                new NavActions.Back()
            ];
            return merge;
        });

    @Effect()
    createCharNet: Observable<Action> = this.actions$.ofType(CharacterActions.ADD_NETWORK)
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
                new CharacterActions.AddNetworkSuccess(),
                // new NavActions.Back()            
            ];
            return merge;
        });

    @Effect()
    selectChar: Observable<Action> = this.actions$.ofType(CharacterActions.SELECT)
        // .withLatestFrom(this.store$.select(fromRoot.getUsernameAndChar), (action, obj) => {
        .map(toPayload)
        .mergeMap((payload) => {
            this.storage.setCharacterState(payload);
            let merge = [
                // new CharacterActions.SelectSuccess(),
                new NavActions.CharacterSheet()
            ];
            return merge;
        });

    constructor(private http: HttpService,
                private actions$: Actions,
                private store$: Store<fromRoot.State>,
                private storage: StorageService) { }
};
