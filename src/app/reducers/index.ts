import { createSelector } from 'reselect';

// child reducers
import * as fromRouter from '@ngrx/router-store';
import * as fromAuth from './auth';
import * as fromUsers from './users';
import * as fromChars from './characters';
import * as fromStats from './character-stats';

// Notes taken from this repo: https://github.com/ngrx/example-app

/**
 * Treat each reducer as a table in a database
 */

export interface State {
    auth: fromAuth.State;
    users: fromUsers.State;
    characters: fromChars.State;
    stats: fromStats.State;
    router: fromRouter.RouterReducerState;
}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */

export const reducers = {
    auth: fromAuth.reducer,
    users: fromUsers.reducer,
    characters: fromChars.reducer,
    stats: fromStats.reducer,
    router: fromRouter.routerReducer
};

// have a separate development and production reducer
// development prevents mutation

// const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
// const productionReducer: ActionReducer<State> = combineReducers(reducers);

// export function reducer(state: any, action: any) {
//   if (environment.production) {
//     return productionReducer(state, action);
//   }
//   else {
//     return developmentReducer(state, action);
//   }
// }

/**
 * Start User accessors and selectors 
 */

// export function getUsersState(state$: Observable<State>):  {
//     return state$.select(state => state.users);
// }
export const getAuthState = (state: State) => state.auth;

export const getAuth = createSelector(getAuthState, fromAuth.selectAuth);

export const getUsersState = (state: State) => state.users;

export const getUsername =  createSelector(getUsersState, fromUsers.getUsername);
export const getEmail =     createSelector(getUsersState, fromUsers.getEmail);
export const getUserId =    createSelector(getUsersState, fromUsers.getUserId);

/**
 * Start Character accessors and selectors
 */

export const getCharState    = (state: State) => state.characters;

export const getCharEntities = createSelector(getCharState, fromChars.getEntities);
export const getCharIds      = createSelector(getCharState, fromChars.getIds );
export const getChars        = createSelector(getCharState, fromChars.getCharacters);
export const getSelectedChar = createSelector(getCharState, fromChars.getSelectedCharacter);
// gets the current user, fetches all character entities
// returns: array of the current users characters

// export const getUserCharacters = createSelector(getSelectedUser, getCharEntities,
//     (user, characters) => user.charIds.map(id => characters[id]));


/**
 * Start CharacterStat accessors and selectors
 */
export const getStatState = (state: State) => state.stats;

export const getStats =             createSelector(getStatState, fromStats.getStats);
export const getSelectedStatId =    createSelector(getStatState, fromStats.getSelectedStatId);
export const getCurrentStat =       createSelector(getStatState, fromStats.getSelectedStat, );

// export const getCharStats    = createSelector(getSelectedChar, getStatEntities,
//    (char, stats) => char.statIds.map(id => stats[id]));

