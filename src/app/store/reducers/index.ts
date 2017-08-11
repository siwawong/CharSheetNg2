import { createSelector } from 'reselect';

// child reducers
// import * as fromRouter from '@ngrx/router-store';
import * as fromAuth from './auth-reducer';
import * as fromUsers from './user-reducer';
import * as fromChars from './character-reducer';
import * as fromStats from './stat-reducer';

// Notes taken from this repo: https://github.com/ngrx/example-app

/**
 * Treat each reducer as a table in a database
 */

export interface State {
    auth: fromAuth.State;
    users: fromUsers.State;
    characters: fromChars.State;
    stats: fromStats.State;
    // router: fromRouter.RouterReducerState;
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
    stats: fromStats.reducer
    // router: fromRouter.routerReducer
};

export const getAuthState = (state: State) => state.auth;

export const getAuth = createSelector(getAuthState, fromAuth.selectAuth);

export const getUsersState = (state: State) => state.users;

export const getUsername =  createSelector(getUsersState, fromUsers.getUsername);
export const getEmail =     createSelector(getUsersState, fromUsers.getEmail);
export const getUserId =    createSelector(getUsersState, fromUsers.getUserId);
export const getUser =      createSelector(getUsersState, fromUsers.getUser);

export const getCharState    = (state: State) => state.characters;

export const getCharacters       = createSelector(getCharState, fromChars.getCharacters);
export const getCharacter = createSelector(getCharState, fromChars.getCharacter);
export const getCharacterId = createSelector(getCharState, fromChars.getCharacterId);

export const getStatState = (state: State) => state.stats;

export const getStats =             createSelector(getStatState, fromStats.getStats);
export const getStatIndex =    createSelector(getStatState, fromStats.getSelectedStatId);
export const getCurrentStat =       createSelector(getStatState, fromStats.getSelectedStat);

export const getCharAuth = createSelector(getAuth, getCharacterId, (auth, charId) => { return {auth, charId}});
export const getUsernameAndChar = createSelector(getUsername, getCharacter, (user, char) => { return {user, char}});
export const getStatToRemove =
    createSelector(getAuth, getCharacterId, getCurrentStat, (auth, char, stat) => { return { auth, char, stat} });
