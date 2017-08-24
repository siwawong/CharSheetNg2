import { createSelector } from 'reselect';

import * as fromUser from './user-reducer';
import * as fromChars from './character-reducer';
import * as fromStats from './stat-reducer';
import * as fromNav from './nav-reducer';

// Notes taken from this repo: https://github.com/ngrx/example-app

export interface State {
    user: fromUser.UserState;
    characters: fromChars.CharacterState;
    stats: fromStats.StatState;
    nav: fromNav.State;
};

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
export const getCharacterId      = createSelector(getCharState, fromChars.getSelectedId);
export const getLatestChar       = createSelector(getCharState, fromChars.getLastAdded);
export const getCharMeta         = createSelector(getCharState, fromChars.getMeta);
export const getCharLateMeta     = createSelector(getCharState, fromChars.getLatestMeta);

export const getStatState = (state: State) => state.stats;

export const getStats        = createSelector(getStatState, fromStats.getStats);
export const getStatId       = createSelector(getStatState, fromStats.getSelectedId);
export const getStat         = createSelector(getStatState, fromStats.getStat);
export const getLatestStat   = createSelector(getStatState, fromStats.getLastAdded);
export const getStatMeta     = createSelector(getStatState, fromStats.getMeta);
export const getStatLateMeta = createSelector(getStatState, fromStats.getLatestMeta);

export const getNavState = (state: State) => state.nav;

export const getNavRootPage    = createSelector(getNavState, fromNav.getRootPage);
export const getNavStackPage   = createSelector(getNavState, fromNav.getStackPage);
export const getNav            = createSelector(getNavRootPage, getNavStackPage, (root, stack) =>  { return { root, stack }});

export const getCharAuth        = createSelector(getAuth, getCharacterId, (auth, charId) => { return { auth, charId }});
export const getUsernameAndChar = createSelector(getUsername, getCharacter, (user, char) => { return { user, char }});
export const getStatToRemove    =
    createSelector(getAuth, getCharacterId, getStat, (auth, char, stat) => { return { auth, char, stat} });