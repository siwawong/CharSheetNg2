import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/flatMap';
import 'rxjs/add/operator/withLatestFrom';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import { HttpService } from '../../services/http.service';
import { StorageService } from '../../services/storage.service';

import * as StatActions from '../actions/stat-actions';
import * as NavActions from '../actions/nav-actions';
import * as fromRoot from '../reducers';

@Injectable()
export class StatEffects {
    @Effect()
    add$: Observable<Action> = this.actions$.ofType(StatActions.ADD)
    .withLatestFrom(this.store$.select(fromRoot.getStatLateMeta), (action, state) => state)
    .map((state) => this.storage.addStat(state.meta.ids, state.meta.selectedId, state.stat))    
    .mergeMap((stat)  => {
            // Check for Error and dispatch here?
            // logic for when to update network based on timer goes here?
            let merge = [
                new StatActions.AddNetwork(stat),
                new NavActions.Back()
            ];
            return merge;
        });

    @Effect()
    addNetwork$: Observable<Action> = this.actions$.ofType(StatActions.ADD_NETWORK)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getCharAuth), (payload, token) => {
            return {
                auth: token.auth,
                charId: token.charId,
                stat: payload
            };            
        })
        .switchMap((result) => this.http.createCharacterStat(result.auth, result.charId, result.stat))
        .map((stat) => new StatActions.AddNetworkSuccess());
    
    @Effect({dispatch: false})
    saveMany: Observable<Action> = this.actions$.ofType(StatActions.SAVE_MANY)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getStatMeta), (stats, state) => {
            return {
                stats,
                state
            };
        })
        .map((payload) => {
            this.storage.setStatMetaState(payload.state.ids, payload.state.selectedId);
            this.storage.setStats(payload.stats);
            return null;
        })

    @Effect()
    loadMany$: Observable<Action> = this.actions$.ofType(StatActions.LOAD_MANY)
        .mergeMap(() => this.storage.getStats())
        .mergeMap((newStatState) => {
            let newAction: Action[] =[];

            if (newStatState === null) {
                newAction.push(new StatActions.LoadManyNetwork());
            } else {
                newAction.push(new StatActions.LoadManySuccess(newStatState));
            };
            newAction.push(new NavActions.CharacterSheet());

            return newAction;
        });

    @Effect()
    loadManyNet$: Observable<Action> = this.actions$.ofType(StatActions.LOAD_MANY_NETWORK)
        .withLatestFrom(this.store$.select(fromRoot.getCharAuth), (action, payload) => payload)
        .switchMap((payload) => this.http.getCharacterStats(payload.auth, payload.charId))
        .mergeMap((result) =>  {
            let merge: Action[] = [
                new StatActions.LoadManyNetworkSuccess(result)
            ];
            if (result.length > 0 ) {
                merge.push(new StatActions.SaveMany(result))
            }
            return merge;
            // Save Dispatched Here?
        });
    
    @Effect({dispatch: false})
    removeAll$: Observable<Action> = this.actions$.ofType(StatActions.REMOVE_ALL)
        .withLatestFrom(this.store$.select(fromRoot.getStatMeta), (action, meta) => meta)
        .map((meta) => {
            // if (meta.ids.length > 0) {
            //     this.storage.remStats();                
            // }
            this.storage.remStats();
            return null;
        });

    @Effect()
    removeAllNet$: Observable<Action> = this.actions$.ofType(StatActions.REMOVE_ALL_NETWORK)
        .withLatestFrom(this.store$.select(fromRoot.getCharAuth), (action, payload) => payload)
        // Need to Add Delete All Character Stats
        .switchMap((payload) => this.http.deleteCharacterStats(payload.auth, payload.charId))
        .map((res) => new StatActions.RemoveAllNetworkSuccess());

    @Effect()
    remove$: Observable<Action> = this.actions$.ofType(StatActions.REMOVE)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getStatLateMeta), (payload, state) => {
            return {
                ids: state.meta.ids,
                selected: state.meta.selectedId,
                statId: payload
            };
        })
        .map((payload) => {
            this.storage.remStat(payload.ids, payload.selected, payload.statId);
            return new StatActions.RemoveNetwork(payload.statId);
        });

    @Effect()
    removeNet$: Observable<Action> = this.actions$.ofType(StatActions.REMOVE_NETWORK)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getCharAuth), (payload, char) => {
            return {
                auth: char.auth,
                charId: char.charId,
                statId: payload
            };        
        })
        .switchMap((payload) => this.http.deleteCharacterStat(payload.auth, payload.charId, payload.statId))
        .map((res) => new StatActions.RemoveNetworkSuccess());  
  
    @Effect()
    update$: Observable<Action> = this.actions$.ofType(StatActions.UPDATE)
        .map(toPayload)
        .map((charStat) => {
            this.storage.setStat(charStat);
            return new StatActions.UpdateNetwork(charStat);
        });

    @Effect()
    updateNet$: Observable<Action> = this.actions$.ofType(StatActions.UPDATE_NETWORK)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getCharAuth), (payload, charId) => {
            return {
                auth: charId.auth,
                char: charId.charId,
                stat: payload
            };
        })
        .switchMap((payload) => this.http.patchCharacterStat(payload.auth, payload.char, payload.stat))
        .map(() => new StatActions.UpdateNetworkSuccess());

    @Effect({dispatch: false})
    select$: Observable<Action> = this.actions$.ofType(StatActions.SELECT)
        .withLatestFrom(this.store$.select(fromRoot.getStatLateMeta), (action, state) => state)
        .map((state) => {
            this.storage.setStatMetaState(state.meta.ids, state.meta.selectedId);
            return null;
        })

    constructor(private http: HttpService,
                private actions$: Actions,
                private store$: Store<fromRoot.State>,
                private storage: StorageService) { }
};
