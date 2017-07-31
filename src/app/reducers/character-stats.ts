import { createSelector } from 'reselect';
// import '@ngrx/core/add/operator/select';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/let';
// import { Observable } from 'rxjs/Observable';
// import { combineLatest } from 'rxjs/observable/combineLatest';

import * as StatActions from '../actions/character-stat';
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

export function reducer(state = initialState, action: StatActions.All): State {
    switch (action.type) {
        case StatActions.ADD: {
            const newStat = action.payload;

            return {
                ids: [...state.ids, newStat.id],
                entities: Object.assign({}, state.entities, {[newStat.id]: newStat}),
                selectedStatId: state.selectedStatId,
            }
        }
        case StatActions.UPDATE: {
            const updatedStat = action.payload;

            return {
                ids: [...state.ids],
                entities: Object.assign({}, state.entities, {[updatedStat.id]: updatedStat}),
                selectedStatId: state.selectedStatId
            }
        }

        case StatActions.REMOVE: {
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

export const getEntities       = (s: State) => s.entities;
export const getIds            = (s: State) => s.ids;
export const getSelectedStatId = (s: State) => s.selectedStatId;

export const getStats = createSelector(getIds, getEntities,
    (ids, entities) => ids.map(id => entities[id]));

export const getSelectedStat =
    createSelector(getSelectedStatId, getEntities, (id, entities) => entities[id]);