import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/flatMap';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import { HttpService } from '../../services/http.service';
import { StorageService } from '../../services/storage.service';

import * as UserActions from '../actions/user-actions';
import * as NavActions from '../actions/nav-actions';
import * as CharacterActions from '../actions/character-actions';
import * as StatActions from '../actions/stat-actions';
import * as fromRoot from '../reducers';

@Injectable()
export class UserEffects {
    @Effect()
    $create: Observable<Action> = this.actions$.ofType(UserActions.CREATE)
        .map(toPayload)
        .switchMap(payload => this.http.createUser(payload.name, payload.email, payload.password))
        .mergeMap((user) => {
            let mergeActions = [
                new UserActions.CreateSuccess(user),
                new NavActions.CharacterList(),
                new CharacterActions.LoadManyNetwork()
            ];
            this.storage.setUserState(user);
            return mergeActions;
        });

    @Effect()
    login$: Observable<Action> = this.actions$.ofType(UserActions.LOGIN)
        .map(toPayload)
        .switchMap(payload => {
            return this.http.login(payload.email, payload.password);
        })
        .mergeMap((user) => {
            let mergeActions = [
                new UserActions.LoginSuccess(user),
                new NavActions.CharacterList(),               
                new CharacterActions.LoadManyNetwork()
            ];
            this.storage.setUserState(user);           
            return mergeActions;
        });

    @Effect()
    logout$: Observable<Action> = this.actions$.ofType(UserActions.LOGOUT)
        .withLatestFrom(this.store$.select(fromRoot.getAuth), (action, token) => token)
        .switchMap((authToken) => this.http.logout(authToken))
        .mergeMap((res) => {
            let mergeActions: Action[] = [];
            if (res) {
                this.storage.clearDB();
                mergeActions.push(new UserActions.LogoutSuccess());
                mergeActions.push(new CharacterActions.Logout());
                mergeActions.push(new StatActions.Logout());
                mergeActions.push(new NavActions.Login());
            } else {
                // Need action for logout error!!!
                mergeActions.push(new UserActions.LoadError());
            }
            return mergeActions;
        });
    
    // @Effect()
    // deleteLoc$: Observable<Action> = this.actions$.ofType(UserActions.DELETE_SUCCESS)
    //     .map(() => {

    //         return null;
    //     });
    
    @Effect()
    load$: Observable<Action> = this.actions$.ofType(UserActions.LOAD)
        .mergeMap(() => this.storage.getUserState())
        .mergeMap((userState) => {
            let newAction: Action[] = [];
            if (userState === null) {
                newAction.push(new UserActions.LoadNone());
                newAction.push(new NavActions.Login());
            } else {
                newAction.push(new UserActions.LoadSuccess(userState));
                newAction.push(new CharacterActions.LoadMany());
            }
            return newAction;
        });
    
                    // let newAction: Action[] = [];
            // this.storage.getUserState();
            // // Fit a Catch in here for loaderror?
            // // LoadNone might be unnecessary

    constructor(private http: HttpService,
                private actions$: Actions,
                private store$: Store<fromRoot.State>,
                private storage: StorageService) { }
};
