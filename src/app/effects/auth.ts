import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import { HttpService } from '../services/http.service';
import * as UserActions from '../actions/users';
import * as AuthActions from '../actions/auth';
import * as fromRoot from '../reducers';

@Injectable()
export class AuthEffects {
    @Effect()
    login$: Observable<Action> = this.actions$.ofType(AuthActions.LOGIN)
        .map(toPayload)
        .switchMap(payload => this.http.login(payload.email, payload.password))
        // .map((user) => new AuthActions.LoginSuccess(user.authToken));
        .mergeMap((user) => {
            let mergeActions = [new AuthActions.LoginSuccess(user.authToken), new UserActions.AddSuccess(user)];
            this.router.navigateByUrl(user.name);
            return mergeActions;
        });
        // .withLatestFrom(this.store$.select(fromRoot.getSelectedUser))
        // .map((userName, index, string) => this.router.navigateByUrl(string));
        // .withLatestFrom(this.store$.select(fromRoot.getSelectedUser))
        // .mergeMap((mergeActions) => {
        //     this.router.navigateByUrl('character');
        // });

    constructor(private http: HttpService, private actions$: Actions, private store$: Store<fromRoot.State>, private router: Router) { }
}
