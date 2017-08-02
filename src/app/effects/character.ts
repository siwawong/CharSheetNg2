import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import { HttpService } from '../services/http.service';
import * as CharacterActions from '../actions/character';
import * as fromRoot from '../reducers';

@Injectable()
export class CharacterEffects {
    // @Effect()
    // getAll: Observable<Action> = this.actions$.ofType(CharacterActions.GET_ALL)


    constructor(private http: HttpService, private actions$: Actions, private store$: Store<fromRoot.State>, private router: Router) { }
};
