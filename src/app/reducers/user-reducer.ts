import { createSelector } from 'reselect';

import * as UserActions from '../actions/user-actions';
import { User } from '../models/user-model';

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

        // case UserActions.LINKCHAR: {
        //     let updatedUser = Object.assign({}, state.entities[action.payload.userKey]);

        //     // add new link
        //     updatedUser.charIds = [...updatedUser.charIds, action.payload.charKey];

        //     let updatedEntities = Object.assign({}, state.entities);
        //     updatedEntities[action.payload.userKey] = updatedUser;

        //     return {
        //         ids: state.ids,
        //         entities: updatedEntities,
        //         selectedUserId: state.selectedUserId
        //     }
        // }

        // case UserActions.UNLINKCHAR: {
        //     let updatedUser = Object.assign({}, state.entities[action.payload.userKey]);

        //     updatedUser.charIds = updatedUser.charIds.filter(id => id !== action.payload.charKey);

        //     let updatedEntities = Object.assign({}, state.entities);
        //     updatedEntities[action.payload.userKey] = updatedUser;

        //     return {
        //         ids: state.ids,
        //         entities: updatedEntities,
        //         selectedUserId: state.selectedUserId
        //     }
        // }
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

// export const getSelectedUserId = (state: State) => state.selectedUserId;
// export const getEntities       = (state: State) => state.entities;
// export const getIds            = (state: State) => state.ids;
// export const getUsers          = createSelector(getIds, getEntities, (ids, entities) => {
//     return ids.map(id => entities[id]);
// });

// export const getSelectedUser  = createSelector(getSelectedUserId, getEntities, (id, entities) => entities[id]);
