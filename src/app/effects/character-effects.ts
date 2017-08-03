import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/withLatestFrom';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import { HttpService } from '../services/http.service';
import * as CharacterActions from '../actions/character-actions';
import * as fromRoot from '../reducers';

@Injectable()
export class CharacterEffects {
    @Effect()
    getAll: Observable<Action> = this.actions$.ofType(CharacterActions.GET_ALL)
        .combineLatest(this.store$.select(fromRoot.getAuth), (action, token) => token)
        .switchMap((authToken) => this.http.getCharacters(authToken))
        .map((res) => new CharacterActions.GetAllSuccess(res));

    @Effect()
    createChar: Observable<Action> = this.actions$.ofType(CharacterActions.CREATE)
        .map(toPayload)
        .combineLatest(this.store$.select(fromRoot.getAuth), (payload, token) => {
            return {
                token: token,
                name: payload
            };
        })
        .switchMap((payload) => this.http.createCharacter(payload.token, payload.name))
        .map((res) => new CharacterActions.CreateSuccess(res));

    @Effect()
    selectChar: Observable<Action> = this.actions$.ofType(CharacterActions.SELECT)
        .withLatestFrom(this.store$.select(fromRoot.getUsernameAndChar), (action, obj) => {
            this.router.navigate([obj.user, obj.char.name], { relativeTo: this.activeRoute });
            return new CharacterActions.SelectSuccess();
        });

    constructor(private http: HttpService,
                private actions$: Actions,
                private store$: Store<fromRoot.State>,
                private router: Router,
                private activeRoute: ActivatedRoute) { }
};
