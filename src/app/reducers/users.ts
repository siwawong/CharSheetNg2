import { createSelector } from 'reselect';

import * as UserActions from '../actions/users';
import { User } from '../models/user';

export interface State {
    ids: string[];
    entities: { [id: string]: User};
    selectedUserId: string | null;
};

const initialState: State = {
    ids: [],
    entities: {},
    selectedUserId: null,
};

export function reducer(state = initialState, action: UserActions.All): State {
    switch (action.type) {
        case UserActions.ADD_SUCCESS: {
            const newUser = action.payload;

            return {
                ids: [...state.ids, newUser.id],
                entities: Object.assign({}, state.entities, {[newUser.id]: newUser}),
                selectedUserId: newUser.id,
            };
        }
        case UserActions.UPDATE_SUCCESS: {
            const updatedChar = action.payload;

            return {
                ids: [...state.ids],
                entities: Object.assign({}, state.entities, {[updatedChar.id]: updatedChar}),
                selectedUserId: state.selectedUserId
            };
        }

        case UserActions.REMOVE_SUCCESS: {
            const toRemoveId = action.id;
            const selectedUserId = (toRemoveId === state.selectedUserId) ? null : state.selectedUserId;

            return {
                ids: state.ids.filter(id => id !== toRemoveId),
                entities: Object.assign({}, state.entities, {[toRemoveId]: undefined}),
                selectedUserId: selectedUserId
            };
        }

        case UserActions.SELECT: {
            return {
                ids: state.ids,
                entities: state.entities,
                selectedUserId: action.payload
            };
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

export const getSelectedUserId = (state: State) => state.selectedUserId;
export const getEntities       = (state: State) => state.entities;
export const getIds            = (state: State) => state.ids;
export const getUsers          = createSelector(getIds, getEntities, (ids, entities) => {
    return ids.map(id => entities[id]);
});

export const getSelectedUser  = createSelector(getSelectedUserId, getEntities, (id, entities) => entities[id]);
