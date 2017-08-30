import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/do';
import 'rxjs/add/operator/withLatestFrom';
// import 'rxjs/add/operator/flatMap';
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

@Injectable()
export class CharacterEffects {
    @Effect()
    createChar$: Observable<Action> = this.actions$.ofType(CharacterActions.ADD)
        .withLatestFrom(this.store$.select(fromRoot.getCharLateMeta), (action, state) => state)
        .map((state) => this.storage.addChar(state.meta.ids, state.meta.selectedId, state.char))
        .mergeMap((char) => {
            // Check for Error and dispatch here?
            // logic for when to update network based on timer goes here?
            let merge = [
                new CharacterActions.AddNetwork(char),
                new NavActions.Back()
            ];
            return merge;
        });

    @Effect()
    createCharNet$: Observable<Action> = this.actions$.ofType(CharacterActions.ADD_NETWORK)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getAuth), (payload, token) => {
            return {
                token: token,
                char: payload
            };
        })
        .switchMap((payload) => this.http.createCharacter(payload.token, payload.char.id, payload.char.name))
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
        .mergeMap((newCharState) => {
            let newAction: Action[] = [];

            // Call NavACtions then stat or 
            if (newCharState === null) {
                newAction.push(new CharacterActions.LoadManyNetwork());
                newAction.push(new NavActions.CharacterList());
            } else {
                // Potential Error Here with no type checking and unknow DB response
                newAction.push(new CharacterActions.LoadManySuccess(newCharState));
                if (newCharState.selected !== null) {
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
        .withLatestFrom(this.store$.select(fromRoot.getCharLateMeta), (action, state) => state)
        // .map(toPayload)
        .map((state) => {
            this.storage.setCharMetaState(state.meta.ids, state.meta.selectedId);
            return new StatActions.LoadMany();
        });
    
    @Effect({dispatch: false})
    unselectChar$: Observable<Action> = this.actions$.ofType(CharacterActions.UNSELECT)
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
