import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/combineLatest';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import { HttpService } from '../services/http.service';
import * as UserActions from '../actions/user-actions';
import * as CharacterActions from '../actions/character-actions';
import * as AuthActions from '../actions/auth-actions';
import * as StatActions from '../actions/stat-actions';
import * as fromRoot from '../reducers';

@Injectable()
export class AuthEffects {
    @Effect()
    create$: Observable<Action> = this.actions$.ofType(AuthActions.CREATE)
        .map(toPayload)
        .switchMap(payload => {
            return this.http.login(payload.email, payload.password);
        })
        .mergeMap((user) => {
            let mergeActions = [new AuthActions.CreateSuccess(user.authToken), new UserActions.AddSuccess(user)];
            this.router.navigateByUrl(user.name);
            return mergeActions;
        });

    @Effect()
    delete$: Observable<Action> = this.actions$.ofType(AuthActions.DELETE)
        .combineLatest(this.store$.select(fromRoot.getAuth), (action, token) => token)
        .switchMap((authToken) => this.http.logout(authToken))
        .mergeMap((username) => {
            let mergeActions = [
                new AuthActions.DeleteSuccess(),
                new UserActions.RemoveSuccess(),
                new CharacterActions.RemoveAllSuccess()];
            this.router.navigateByUrl('');
            return mergeActions;
        });

    constructor(private http: HttpService, private actions$: Actions, private store$: Store<fromRoot.State>, private router: Router) { }
};
