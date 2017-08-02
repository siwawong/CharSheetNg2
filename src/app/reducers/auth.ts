import { createSelector } from 'reselect';

import * as AuthActions from '../actions/auth';

export interface State {
    authToken: string;
    persist: boolean;
};

const initialState: State = {
    authToken: '',
    persist: false
};

export function reducer(state = initialState, action: AuthActions.All): State {
    switch (action.type) {
        case AuthActions.CREATE_SUCCESS: {
            return {
                authToken: action.auth,
                persist: state.persist
            };
        }
        case AuthActions.DELETE_SUCCESS: {
            return initialState;
        }
        case AuthActions.DELETE:
        case AuthActions.CREATE:
        default: {
            return state;
        }
    }
};

export const selectAuth = (state: State) => state.authToken;
