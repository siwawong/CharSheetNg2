import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/withLatestFrom';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';

// import { StorageService } from '../../services/storage.service';

import { App } from 'ionic-angular';

// import { PAGES } from '../../models/nav-model';

import * as NavActions from '../actions/nav-actions';
// import * as UserActions from '../actions/user-actions';
import * as CharacterActions from '../actions/character-actions';
import * as fromRoot from '../reducers';

@Injectable()
export class NavEffects {
    @Effect({dispatch: false})
    backNav: Observable<Action> = this.actions$.ofType(NavActions.BACK)
        .map(() => {
            this.navCtrl().pop();
            return null;
        });

    @Effect({dispatch: false})
    loginNav: Observable<Action> = this.actions$.ofType(NavActions.LOGIN)
        .withLatestFrom(this.store$.select(fromRoot.getNavRootPage), (action, page) => {
            this.navCtrl().setRoot(page);
            return null;
        });

    @Effect()
    charListNav: Observable<Action> = this.actions$.ofType(NavActions.CHARACTER_LIST)
        .withLatestFrom(this.store$.select(fromRoot.getNavRootPage), (action, page) => {
            this.navCtrl().setRoot(page);
            return new CharacterActions.Unselect();
        });
    
    @Effect({dispatch: false})
    createUserNav: Observable<Action> = this.actions$.ofType(NavActions.CREATE_USER)
        .withLatestFrom(this.store$.select(fromRoot.getNavStackPage), (action, page) => {
            this.navCtrl().push(page);
            return null;
        });

    @Effect({dispatch: false})
    charSheetNav: Observable<Action> = this.actions$.ofType(NavActions.CHARACTER_SHEET)
        .withLatestFrom(this.store$.select(fromRoot.getNavRootPage), (action, page) => {
            this.navCtrl().setRoot(page);
            return null;
        });

    @Effect({dispatch: false})
    createCharNav: Observable<Action> = this.actions$.ofType(NavActions.CREATE_CHARACTER)
        .withLatestFrom(this.store$.select(fromRoot.getNavStackPage), (action, page) => {
            this.navCtrl().push(page);
            return null;
        });

    @Effect({dispatch: false})
    createStatNav: Observable<Action> = this.actions$.ofType(NavActions.CREATE_STAT)
        .withLatestFrom(this.store$.select(fromRoot.getNavStackPage), (action, page) => {
            this.navCtrl().push(page);
            return null;
        });
    
    // // Complex Check to move to proper page when local data loads?
    // @Effect()
    // load$: Observable<Action> = this.actions$.ofType(NavActions.LOAD)
    //     .map(() => {
    //         let newAction;
    //         const newState = this.storage.getNavState();

    //         if (newState === null) {
    //             newAction = new NavActions.LoadNone();
    //             // this.navCtrl().setRoot(PAGES.login);
    //         } else {
    //             newAction = new NavActions.LoadSuccess(newState);
    //         }
    //         return newAction;
    //     });
    
    // @Effect({dispatch: false})
    // loadSuccess$: Observable<Action> = this.actions$.ofType(NavActions.LOAD_SUCCESS)
    //     .map(toPayload)
    //     .do((payload) => {
    //         this.navCtrl().setRoot(payload.root);
    //         return null;
    //     });
    
    // // Complex Check to move to proper page when local data collapses?
    // @Effect({dispatch: false})
    // begin$: Observable<Action> = 
    //     this.actions$.ofType(UserActions.LOAD_NONE || UserActions.LOAD_ERROR || NavActions.LOAD_NONE || NavActions.LOAD_ERROR)
    //         .map(() => {
    //             this.navCtrl().setRoot(PAGES.login);
    //             return null;
    //         });

    constructor(private actions$: Actions,
                private store$: Store<fromRoot.State>,
                private app: App) { }

    navCtrl() {
        return this.app.getActiveNavs()[0];
    };
}
