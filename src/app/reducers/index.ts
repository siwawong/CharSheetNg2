import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { compose } from '@ngrx/core/compose';

import { storeLogger} from 'ngrx-store-logger';

import { storeFreeze } from 'ngrx-store-freeze';

import { combineReducers } from '@ngrx/store';

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

// wrapper functions for users

export function getUsersState(state$: Observable<State>) {
    return state$.select(state => state.users);
}

export const getUserEntities = compose(fromUsers.getEntities, getUsersState);
export const getUserIds = compose(fromUsers.getIds, getUsersState);

// return array of current users
export function getUsers(state$: Observable<State>) {
    return combineLatest<{[id: string]: User}, string[]> (
        state$.let(getUserEntities),
        state$.let(getUserIds)
    )
    .map(([ entities, ids ]) => ids.map(id => entities[id]));
}

export function getCharState(state$: Observable<State>) {
    return state$.select(state => state.characters);
}

export const getCharEntities = compose(fromChars.getEntities, getCharState);
export const getCharIds = compose(fromChars.getIds, getCharState);

// return array of current users
export function getChars(state$: Observable<State>) {
    return combineLatest<{[id: string]: Character}, string[]> (
        state$.let(getCharEntities),
        state$.let(getCharIds)
    )
    .map(([ entities, ids ]) => ids.map(id => entities[id]));
}


export function getStatState(state$: Observable<State>) {
    return state$.select(state => state.stats);
}

export const getStatEntities = compose(fromStats.getEntities, getStatState);
export const getStatIds = compose(fromStats.getIds, getStatState);

// return array of current users
export function getStats(state$: Observable<State>) {
    return combineLatest<{[id: string]: CharacterStat}, string[]> (
        state$.let(getStatEntities),
        state$.let(getStatIds)
    )
    .map(([ entities, ids ]) => ids.map(id => entities[id]));
}

// how do I provide an argument... perhaps done in the service
export function getCharacterStats(state$: Observable<State>) {

}