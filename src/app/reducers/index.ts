import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { ActionReducer } from '@ngrx/store';

import { compose } from '@ngrx/core/compose';

import { storeLogger} from 'ngrx-store-logger';

import { storeFreeze } from 'ngrx-store-freeze';

import { combineReducers } from '@ngrx/store';

// environment
import { environment } from '../../environments/environment';

// models
import { User } from '../models/user';
import { Character } from '../models/character';
import { CharacterStat} from '../models/character-stat';

// child reducers
import * as fromUsers from './users';
import * as fromChars from './characters';
import * as fromStats from './character-stats';

// Notes taken from this repo: https://github.com/ngrx/example-app

/**
 * Treat each reducer as a table in a database
 */

export interface State {
    users: fromUsers.State;
    characters: fromChars.State;
    stats: fromStats.State;
}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */

const reducers = {
    users: fromUsers.reducer,
    characters: fromChars.reducer,
    stats: fromStats.reducer
}

// have a separate development and production reducer
// development prevents mutation

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  }
  else {
    return developmentReducer(state, action);
  }
}

/**
 * Start User accessors and selectors 
 */

export function getUsersState(state$: Observable<State>) {
    return state$.select(state => state.users);
}

export const getUserEntities = compose(fromUsers.getEntities, getUsersState);
export const getUserIds      = compose(fromUsers.getIds, getUsersState);
export const getUsers        = compose(fromUsers.getUsers, getUsersState);
export const getUser         = compose(fromUsers.getSelectedUser, getUsersState);

/**
 * Start Character accessors and selectors
 */

export function getCharState(state$: Observable<State>) {
    return state$.select(state => state.characters);
}

export const getCharEntities = compose(fromChars.getEntities, getCharState);
export const getCharIds      = compose(fromChars.getIds, getCharState);
export const getChars        = compose(fromChars.getCharacters, getCharState);

/**
 * Start CharacterStat accessors and selectors
 */
export function getStatState(state$: Observable<State>) {
    return state$.select(state => state.stats);
}

export const getStatEntities = compose(fromStats.getEntities, getStatState);
export const getStatIds      = compose(fromStats.getIds, getStatState);
export const getStats        = compose(fromStats.getStats, getStatState);
