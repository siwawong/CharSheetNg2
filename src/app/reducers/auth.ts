import { createSelector } from 'reselect';

import * as AuthActions from '../actions/auth';

export interface State {
    auth: string;
    persist: boolean;
};

const initialState: State = {
    auth: null,
    persist: false
};

export function reducer(state = initialState, action: AuthActions.All): State {
    switch (action.type) {
        case AuthActions.LOGIN_SUCCESS:
        case AuthActions.CREATE_SUCCESS: {
            return {
                auth: action.auth,
                persist: state.persist
            };
        }
        case AuthActions.LOGOUT: {
            return initialState;
        }
        case AuthActions.LOGIN:
        default: {
            return state;
        }
    }
};

export const getAuth = (state: State) => state.auth;
