import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import { HttpService } from '../../services/http.service';
import { StorageService } from '../../services/storage.service';

import * as CharacterActions from '../actions/character-actions';
import * as NavActions from '../actions/nav-actions';
import * as StatActions from '../actions/stat-actions';
import * as fromRoot from '../reducers';

import * as PREFERENCES from '../../models/preferences-model';

@Injectable()
export class CharacterEffects {
    @Effect()
    createChar$: Observable<Action> = this.actions$.ofType(CharacterActions.ADD)
        .withLatestFrom(this.store$.select(fromRoot.getLatestChar), (action, char) => char)
        // .map((state) => this.storage.addChar(state.meta.ids, state.meta.selectedId, state.char))
        .withLatestFrom(this.store$.select(fromRoot.getNetPref), (char, prefstate) => {return {char, prefstate}})
        .mergeMap((meta) => {
            let merge: Action[] = [
                new CharacterActions.Save(meta.char),
                new CharacterActions.SaveMeta()
            ];
            // Check for Error and dispatch here?
            // TODO: CHECK TIMER IS UP?
            if (meta.prefstate.mode === PREFERENCES.MODE.ONLINE) {
               merge.push(new CharacterActions.AddNetwork(meta.char));
            }
            
            merge.push(new NavActions.Back());
            return merge;
        });

    @Effect()
    createCharNet$: Observable<Action> = this.actions$.ofType(CharacterActions.ADD_NETWORK)
        // .withLatestFrom(this.store$.select(fromRoot.getLatestChar), (action, char) => char)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getAuth), (char, token) => {
            return {
                token,
                char
            };
        })
        .switchMap((payload) => this.http.createCharacter(payload.token, payload.char))
        .map(() => new CharacterActions.AddNetworkSuccess());

    @Effect({dispatch: false})
    saveMany$: Observable<Action> = this.actions$.ofType(CharacterActions.SAVE_MANY)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getCharMeta), (chars, state) => {
            return {
                chars,
                state
            };
        })
        .map((payload) => {
            this.storage.setCharMetaState(payload.state.ids, payload.state.selectedId);
            this.storage.setChars(payload.chars);
            return null;
        });
    
    @Effect()
    loadMany$: Observable<Action> = this.actions$.ofType(CharacterActions.LOAD_MANY)
        .mergeMap(() => this.storage.getChars())
        .withLatestFrom(this.store$.select(fromRoot.getNetPref), (charState, prefState) => {return {charState, prefState}})
        .mergeMap((meta) => {
            let newAction: Action[] = [];

            // TODO: Add if null && onlinemode
            if (meta.charState === null && meta.prefState.mode === PREFERENCES.MODE.ONLINE) {
                newAction.push(new CharacterActions.LoadManyNetwork());
                newAction.push(new NavActions.CharacterList());
            } else if (meta.charState !== null) {
                // Potential Error Here with no type checking and unknow DB response
                newAction.push(new CharacterActions.LoadManySuccess(meta.charState));
                if (meta.charState.selected !== null) {
                    newAction.push(new StatActions.LoadMany());                   
                } else {
                    newAction.push(new NavActions.CharacterList());
                }
            }
            
            return newAction;
        });

    @Effect()
    loadManyNet$: Observable<Action> = this.actions$.ofType(CharacterActions.LOAD_MANY_NETWORK)
        .withLatestFrom(this.store$.select(fromRoot.getAuth), (action, token) => token)
        .switchMap((authToken) => this.http.getCharacters(authToken))
        .mergeMap((res) => {
            let merge: Action[] = [
                new CharacterActions.LoadManyNetworkSuccess(res)                
            ];
            if (res.length > 0) {
                merge.push(new CharacterActions.SaveMany(res))
            }
            return merge;
        });
    
    @Effect({dispatch: false})
    removeAll$: Observable<Action> = this.actions$.ofType(CharacterActions.REMOVE_ALL)
        .withLatestFrom(this.store$.select(fromRoot.getCharMeta), (action, meta) => meta)
        .map((meta) => {
            this.storage.remChars();
            return null;  
            // if for when to remove Network
            // return new StatActions.RemoveAllNetwork();
            // return new StatActions.RemoveAllError(); //Need actual action;
        });

    @Effect()
    selectChar$: Observable<Action> = this.actions$.ofType(CharacterActions.SELECT)
        // .withLatestFrom(this.store$.select(fromRoot.getCharLateMeta), (action, state) => state)
        .mergeMap(() => {
            // this.storage.setCharMetaState(state.meta.ids, state.meta.selectedId);
            return [
                new CharacterActions.SaveMeta(),
                new StatActions.LoadMany()
            ];
        });
    
    @Effect()
    unselectChar$: Observable<Action> = this.actions$.ofType(CharacterActions.UNSELECT)
        // .withLatestFrom(this.store$.select(fromRoot.getCharLateMeta), (action, state) => state)
        .map(() => {
            // this.storage.setCharMetaState(state.meta.ids, state.meta.selectedId);
            return new CharacterActions.SaveMeta();
        });

    @Effect()
    update$: Observable<Action> = this.actions$.ofType(CharacterActions.UPDATE)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getNetPref), (char, prefstate) => {return {char, prefstate}})        
        .mergeMap((meta) => {
            let merge: Action[] = [
                new CharacterActions.Save(meta.char)
            ];
            if (meta.prefstate.mode === PREFERENCES.MODE.ONLINE) {
                merge.push(new CharacterActions.UpdateNetwork(meta.char));
            }
            return merge;
        });

    @Effect()
    updateNet$: Observable<Action> = this.actions$.ofType(CharacterActions.UPDATE_NETWORK)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getAuth), (char, auth) => {return {char, auth}})
        .switchMap((meta) => this.http.patchCharacter(meta.auth, meta.char))
        .map(() => new CharacterActions.UpdateNetworkSuccess());

    @Effect()
    updateTime$: Observable<Action> = this.actions$.ofType(CharacterActions.UPDATE_TIME)
        .map(toPayload)
        .map((char) => { 
            return new CharacterActions.Save(char);
        });

    @Effect({dispatch: false})
    save$: Observable<Action> = this.actions$.ofType(CharacterActions.SAVE)
        .map(toPayload)
        .map((char) => {
            this.storage.setChar(char);
            return null;
        });
        

    @Effect({dispatch: false})
    saveMeta$: Observable<Action> = this.actions$.ofType(CharacterActions.SAVE_META)
        .withLatestFrom(this.store$.select(fromRoot.getCharLateMeta), (action, state) => state)
        .map((state) => {
            this.storage.setCharMetaState(state.meta.ids, state.meta.selectedId);
            return null;
        });
    

    constructor(private http: HttpService,
                private actions$: Actions,
                private store$: Store<fromRoot.State>,
                private storage: StorageService) { }
};
