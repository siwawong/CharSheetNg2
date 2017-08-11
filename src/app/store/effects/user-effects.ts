import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Router } from '@angular/router';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import { HttpService } from '../../services/http.service';
import * as UserActions from '../actions/user-actions';
import * as AuthActions from '../actions/auth-actions';
import * as fromRoot from '../reducers';

@Injectable()
export class UserEffects {
    @Effect()
    $create: Observable<Action> = this.actions$.ofType(UserActions.ADD)
        .map(toPayload)
        .switchMap(payload => this.http.createUser(payload.name, payload.email, payload.password))
        .mergeMap((user) => {
            let mergeActions = [new AuthActions.CreateSuccess(user.authToken), new UserActions.AddSuccess(user)];
            // this.router.navigateByUrl(user.name);
            return mergeActions;
        });

    constructor(private http: HttpService, private actions$: Actions, private store$: Store<fromRoot.State>) { }
};
