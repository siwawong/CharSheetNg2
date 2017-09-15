import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import { StorageService } from '../../services/storage.service';

import * as PrefActions from '../actions/preferences-actions';
import * as fromRoot from '../reducers';

@Injectable()
export class PreferencesEffects {

    constructor(private store$: Store<fromRoot.State>, private storage: StorageService) { }
}