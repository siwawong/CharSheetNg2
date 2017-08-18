import { createSelector } from 'reselect';

import * as UserActions from '../actions/user-actions';
import { User } from '../../models/user-model';

export interface State extends User {
    id: string;
    name: string;
    email: string;
};

const initialState: State = {
    id: '',
    name: '',
    email: '',
};

export function reducer(state = initialState, action: UserActions.All): State {
    switch (action.type) {
        case UserActions.UPDATE_SUCCESS:
        case UserActions.ADD_SUCCESS: {
            const newUser = action.payload;

            return {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            };
        }
        case UserActions.REMOVE_SUCCESS: {
            return initialState;
        }

        case UserActions.ADD:
        case UserActions.REMOVE:
        case UserActions.UPDATE:
        default:
            return state;
    }
}

export const getUsername    = (state: State) => state.name;
export const getEmail       = (state: State) => state.email;
export const getUserId      = (state: State) => state.id;
export const getUser        = (state: State): User => {
    return {
        id: state.id,
        name: state.name,
        email: state.email
    };
}
