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

import * as StatActions from '../actions/stat-actions';
import * as NavActions from '../actions/nav-actions';
import * as fromRoot from '../reducers';

@Injectable()
export class StatEffects {
    @Effect()
    add$: Observable<Action> = this.actions$.ofType(StatActions.ADD)
        .map(toPayload)
        .mergeMap((payload) => {
            this.storage.setStatState(payload);
            let merge = [
                new StatActions.AddNetwork(payload),
                new NavActions.Back()
            ];
            return merge;
        });

    @Effect()
    addNetwork$: Observable<Action> = this.actions$.ofType(StatActions.ADD_NETWORK)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getCharAuth), (payload, token) => {
            const test = {
                auth: token.auth,
                charId: token.charId,
                stat: payload
            };
            return test;
        })
        .switchMap((result) => this.http.createCharacterStat(result.auth, result.charId, result.stat))
        .mergeMap(() => {
            let merge = [
                new StatActions.AddNetworkSuccess(),
                // new NavActions.Back()       
            ];
            return merge;
        });

    @Effect()
    loadMany$: Observable<Action> = this.actions$.ofType(StatActions.LOAD_MANY)
        .map(() => {
            let newAction: Action;
            const newState = this.storage.getStatState();

            if (newState === null) {
                newAction = new StatActions.LoadManyNetwork();
            } else {
                newAction = new StatActions.LoadManySuccess(newState);
            };

            return newAction;
        });

    @Effect()
    loadManyNet$: Observable<Action> = this.actions$.ofType(StatActions.LOAD_MANY_NETWORK)
        .withLatestFrom(this.store$.select(fromRoot.getCharAuth), (action, payload) => payload)
        .switchMap((payload) => this.http.getCharacterStats(payload.auth, payload.charId))
        .map((result) =>  {
            this.storage.setStatState(result);
            return new StatActions.LoadManyNetworkSuccess(result);
            // Save Dispatched Here?
        });
    
    @Effect()
    remove$: Observable<Action> = this.actions$.ofType(StatActions.REMOVE)
        .map(toPayload)
        .do((payload) => {
            this.storage.removeStatState(payload);
            return new StatActions.RemoveNetwork(payload);
        });

    @Effect()
    removeNet$: Observable<Action> = this.actions$.ofType(StatActions.REMOVE_NETWORK)
        .withLatestFrom(this.store$.select(fromRoot.getStatToRemove), (action, payload) => payload)
        .switchMap((payload) => this.http.deleteCharacterStat(payload.auth, payload.char, payload.stat.name))
        .map((res) => new StatActions.RemoveNetworkSuccess());
    
    @Effect()
    removeAll$: Observable<Action> = this.actions$.ofType(StatActions.REMOVE_ALL)
        .map(() => {
            this.storage.removeStatState();
            return new StatActions.RemoveAllNetwork();
        });
    
    @Effect()
    removeAllNet$: Observable<Action> = tthis.actions$.ofType(StatActions.REMOVE_ALL_NETWORK)
        .withLatestFrom(this.store$.select(fromRoot.getCharAuth), (action, payload) => payload)
        // Need to Add Delete All Character Stats
        .switchMap((payload) => this.http.deleteCharacterStat(payload.auth, payload.charId, 'Hate'))
        .map((res) => new StatActions.RemoveAllNetworkSuccess());

    @Effect()
    update$: Observable<Action> = this.actions$.ofType(StatActions.UPDATE)
        .map(toPayload)
        .do((charStat) => {
            this.storage.setStatState(charStat);
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

    @Effect()
    select$: Observable<Action> = this.actions$.ofType(StatActions.SELECT)
        .map(toPayload)
        .do((index) => {
            this.storage.setStatState(index);
            return null;
        })

    constructor(private http: HttpService,
                private actions$: Actions,
                private store$: Store<fromRoot.State>,
                private storage: StorageService) { }
};
