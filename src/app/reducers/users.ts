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
        case user.ActionTypes.ADD: {
            const newUser = action.payload;

            return {
                ids: [...state.ids, newUser.id],
                entities: Object.assign({}, state.entities, {[newUser.id]: newUser}),
                selectedUserId: state.selectedUserId,
            }
        }
        case user.ActionTypes.UPDATE: {
            const updatedChar = action.payload;

            return {
                ids: [...state.ids],
                entities: Object.assign({}, state.entities, {[updatedChar.id]: updatedChar}),
                selectedUserId: state.selectedUserId
            }
        }

        case user.ActionTypes.REMOVE: {
            const id = action.id;
            const selectedUserId = (action.id === state.selectedUserId) ? null : state.selectedUserId

            return {
                ids: state.ids.filter(id => id !== id),
                entities: Object.assign({}, state.entities, {[id]: undefined}),
                selectedUserId: selectedUserId
            }
        }

        case user.ActionTypes.SELECT: {
            return {
                ids: state.ids,
                entities: state.entities,
                selectedUserId: action.payload
            }
        }

        case user.ActionTypes.LINKCHAR: {
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

        case user.ActionTypes.UNLINKCHAR: {
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

// selectors
export function getSelectedUserId(state$: Observable<State>) {
    return state$.select(s => s.selectedUserId);
}

export function getEntities(state$: Observable<State>) {
    return state$.select(s => s.entities);
}

export function getIds(state$: Observable<State>) {
    return state$.select(s => s.ids);
}

export function getUsers(state$: Observable<State>) {
    return combineLatest< string[], {[id: string]: User} > (
            state$.let(getIds),
            state$.let(getEntities)
        )
        .map(([ids, entities]) => ids.map(id => entities[id]));
}

// TODO: type coming out is not correct... I am getting an 'array' of things
// from the do function, instead of a single result
export function getSelectedUser(state$: Observable<State>) {
    return combineLatest<string, {[id: string]: User}> (
            state$.let(getSelectedUserId),
            state$.let(getEntities),
        )
        .map(([id, entities]) => entities[id]);
}