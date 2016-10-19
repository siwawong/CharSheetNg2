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
            const selectedUserId = (action.id === state.selectedUserId) ? null : state.selectedUserId;

            return {
                ids: state.ids.filter(id => id !== id),
                entities: Object.assign({}, state.entities, {[id]: undefined}),
                selectedUserId: selectedUserId
            }
        }
    }
}

export function getEntities(state$: Observable<State>) {
    return state$.select(s => s.entities);
}

export function getIds(state$: Observable<State>) {
    return state$.select(s => s.ids);
}
