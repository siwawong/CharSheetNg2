import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/combineLatest';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import { HttpService } from '../services/http.service';
import * as StatActions from '../actions/stat-actions';
import * as fromRoot from '../reducers';

@Injectable()
export class StatEffects {
    @Effect()
    getAll$: Observable<Action> = this.actions$.ofType(StatActions.ADD_MANY)
        .withLatestFrom(this.store$.select(fromRoot.getCharAuth), (action, payload) => payload)
        .switchMap((payload) => this.http.getCharacterStats(payload.auth, payload.charId))
        .map((result) =>  new StatActions.AddManySuccess(result));

    @Effect()
    add$: Observable<Action> = this.actions$.ofType(StatActions.ADD)
        .map(toPayload)
        .combineLatest(this.store$.select(fromRoot.getCharAuth), (payload, token) => {
            const test = {
                auth: token.auth,
                charId: token.charId,
                stat: payload
            };
            return test;
        })
        .switchMap((result) => this.http.createCharacterStat(result.auth, result.charId, result.stat))
        .map((result) => {
            return new StatActions.AddSuccess(result);
        });


    constructor(private http: HttpService, private actions$: Actions, private store$: Store<fromRoot.State>) { }
};
