import { createSelector } from 'reselect';

// child reducers
import * as fromUser from './user-reducer';
import * as fromChars from './character-reducer';
import * as fromStats from './stat-reducer';
import * as fromNav from './nav-reducer';

// Notes taken from this repo: https://github.com/ngrx/example-app

/**
 * Treat each reducer as a table in a database
 */

export interface State {
    user: fromUser.UserState;
    characters: fromChars.State;
    stats: fromStats.State;
    nav: fromNav.State;
};

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */

export const reducers = {
    user: fromUser.reducer,
    characters: fromChars.reducer,
    stats: fromStats.reducer,
    nav: fromNav.reducer
};

export const getUserState = (state: State) => state.user;

export const getAuth        = createSelector(getUserState, fromUser.getAuth);
export const getUsername    = createSelector(getUserState, fromUser.getUsername);
export const getEmail       = createSelector(getUserState, fromUser.getEmail);
export const getUserId      = createSelector(getUserState, fromUser.getUserId);
export const getUser        = createSelector(getUserState, fromUser.getUser);

export const getCharState = (state: State) => state.characters;

export const getCharacters       = createSelector(getCharState, fromChars.getCharacters);
export const getCharacter        = createSelector(getCharState, fromChars.getCharacter);
export const getCharacterId      = createSelector(getCharState, fromChars.getCharacterId);

export const getStatState = (state: State) => state.stats;

export const getStats       = createSelector(getStatState, fromStats.getStats);
export const getStatIndex   = createSelector(getStatState, fromStats.getSelectedStatId);
export const getCurrentStat = createSelector(getStatState, fromStats.getSelectedStat);

export const getNavState = (state: State) => state.nav;

export const getNavRootPage    = createSelector(getNavState, fromNav.getRootPage);
export const getNavStackPage   = createSelector(getNavState, fromNav.getStackPage);
export const getNav            = createSelector(getNavRootPage, getNavStackPage, (root, stack) =>  { return { root, stack }});


export const getCharAuth        = createSelector(getAuth, getCharacterId, (auth, charId) => { return { auth, charId }});
export const getUsernameAndChar = createSelector(getUsername, getCharacter, (user, char) => { return { user, char }});
export const getStatToRemove    =
    createSelector(getAuth, getCharacterId, getCurrentStat, (auth, char, stat) => { return { auth, char, stat} });