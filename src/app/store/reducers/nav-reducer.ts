import { createSelector } from 'reselect';

import * as NavActions from '../actions/nav-actions';

import { PAGES } from '../../models/nav-model';

export interface State {
    pages: { [name: string]: any };
    root: string;
    stack: string;
};

const initialState: State = {
    pages: PAGES,
    root: 'login',
    stack: null
};

export function reducer(state =  initialState, action: NavActions.All): State {
    switch(action.type) {
        case NavActions.LOGIN: {
            return {
                pages: state.pages,
                root: 'login',
                stack: null
            };
        };
        case NavActions.CREATE_USER: {
            return {
                pages: state.pages,
                root: state.root,
                stack: 'createUser'
            };
        };
        case NavActions.CHARACTER_LIST: {
            return {
                pages: state.pages,
                root: 'charList',
                stack: null
            };
        };
        case NavActions.CREATE_CHARACTER: {
            return {
                pages: state.pages,
                root: state.root,
                stack: 'createChar'
            };
        };
        case NavActions.CHARACTER_SHEET: {
            return {
                pages: state.pages,
                root: 'charSheet',
                stack: null
            };
        };
        case NavActions.CREATE_STAT: {
            return {
                pages: state.pages,
                root: state.root,
                stack: 'createStat'
            };
        };
        case NavActions.BACK: {
            return {
                pages: state.pages,
                root: state.root,
                stack: null
            };
        }
        // case NavActions.LOAD_SUCCESS: {
        //     const newState = action.payload;
        //     return {
        //         pages: state.pages,
        //         root: newState.root,
        //         stack: newState.stack
        //     };
        // }
        // case NavActions.LOAD:
        // case NavActions.LOAD_ERROR:
        // case NavActions.LOAD_NONE:
        default: {
            return state;
        }
    }
};

export const selectPages = (state: State) => state.pages;
export const selectRoot = (state: State) => state.root;
export const selectStack = (state: State) => state.stack;

export const getRootPage = createSelector(selectRoot, selectPages, (name, pages) => pages[name]);
export const getStackPage = createSelector(selectStack, selectPages, (name, pages) => pages[name]);
