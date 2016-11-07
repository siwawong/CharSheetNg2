import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import * as stat from '../actions/character-stat';
import { CharacterStat } from '../models/character-stat';

export interface State {
    ids: string[];
    entities: { [id: string]: CharacterStat};
    selectedStatId: string | null;
};

const initialState: State = {
    ids: [],
    entities: {},
    selectedStatId: null,
};

export function reducer(state = initialState, action: stat.Actions): State {
    switch (action.type) {
        case stat.ActionTypes.ADD: {
            const newStat = action.payload;

            return {
                ids: [...state.ids, newStat.id],
                entities: Object.assign({}, state.entities, {[newStat.id]: newStat}),
                selectedStatId: state.selectedStatId,
            }
        }
        case stat.ActionTypes.UPDATE: {
            const updatedStat = action.payload;

            return {
                ids: [...state.ids],
                entities: Object.assign({}, state.entities, {[updatedStat.id]: updatedStat}),
                selectedStatId: state.selectedStatId
            }
        }

        case stat.ActionTypes.REMOVE: {
            const id = action.id;
            const selectedStatId = (action.id === state.selectedStatId) ? null : state.selectedStatId;

            return {
                ids: state.ids.filter(id => id !== id),
                entities: Object.assign({}, state.entities, {[id]: undefined}),
                selectedStatId: selectedStatId
            }
        }
        default:
            return state;
    }
}

export function getEntities(state$: Observable<State>) {
    return state$.select(s => s.entities);
}

export function getIds(state$: Observable<State>) {
    return state$.select(s => s.ids);
}

export function getStats(state$: Observable<State>) {
    return combineLatest< string[], {[id: string]: CharacterStat} >(
        state$.let(getIds),
        state$.let(getEntities)
    )
    .map(([ids, entities]) => ids.map(id => entities[id]));
}
