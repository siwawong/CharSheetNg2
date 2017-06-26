import { createSelector }       from 'reselect';
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import * as user from '../actions/users';
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

export function reducer(state = initialState, action: user.Actions): State {
    switch (action.type) {
        case user.ADD: {
            const newUser = action.payload;

            return {
                ids: [...state.ids, newUser.id],
                entities: Object.assign({}, state.entities, {[newUser.id]: newUser}),
                selectedUserId: state.selectedUserId,
            }
        }
        case user.UPDATE: {
            const updatedChar = action.payload;

            return {
                ids: [...state.ids],
                entities: Object.assign({}, state.entities, {[updatedChar.id]: updatedChar}),
                selectedUserId: state.selectedUserId
            }
        }

        case user.REMOVE: {
            const id = action.id;
            const selectedUserId = (action.id === state.selectedUserId) ? null : state.selectedUserId

            return {
                ids: state.ids.filter(id => id !== id),
                entities: Object.assign({}, state.entities, {[id]: undefined}),
                selectedUserId: selectedUserId
            }
        }

        case user.SELECT: {
            return {
                ids: state.ids,
                entities: state.entities,
                selectedUserId: action.payload
            }
        }

        case user.LINKCHAR: {
            let updatedUser = Object.assign({}, state.entities[action.payload.userKey]);

            // add new link
            updatedUser.charIds = [...updatedUser.charIds, action.payload.charKey];

            let updatedEntities = Object.assign({}, state.entities);
            updatedEntities[action.payload.userKey] = updatedUser;

            return {
                ids: state.ids,
                entities: updatedEntities,
                selectedUserId: state.selectedUserId
            }
        }

        case user.UNLINKCHAR: {
            let updatedUser = Object.assign({}, state.entities[action.payload.userKey]);

            updatedUser.charIds = updatedUser.charIds.filter(id => id !== action.payload.charKey);

            let updatedEntities = Object.assign({}, state.entities);
            updatedEntities[action.payload.userKey] = updatedUser;

            return {
                ids: state.ids,
                entities: updatedEntities,
                selectedUserId: state.selectedUserId
            }
        }

        default:
            return state;
    }
}

export const getSelectedUserId = (state: State) => state.selectedUserId;
export const getEntities       = (state: State) => state.entities;
export const getIds            = (state: State) => state.ids;
export const getUsers          = createSelector(getIds, getEntities, (ids, entities) => {
    return ids.map(id => entities[id]);
});

export const getSelectedUser  = createSelector(getSelectedUserId, getEntities, (id, entities) => entities[id]);