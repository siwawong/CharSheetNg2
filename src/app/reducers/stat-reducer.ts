import { createSelector } from 'reselect';
// import '@ngrx/core/add/operator/select';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/let';
// import { Observable } from 'rxjs/Observable';
// import { combineLatest } from 'rxjs/observable/combineLatest';

import * as StatActions from '../actions/stat-actions';
import { CharacterStat } from '../models/stat-model';

export interface State {
    stats: CharacterStat[];
    selectedIndex: number
};

const initialState: State = {
    stats: [],
    selectedIndex: null,
};

export function reducer(state = initialState, action: StatActions.All): State {
    switch (action.type) {
        case StatActions.UPDATE_SUCCESS: {
            return {
                stats: Object.assign([], ...state.stats, state.stats[state.selectedIndex] = action.payload),
                selectedIndex: null
            };
        }
        case StatActions.ADD_SUCCESS: {
            state.stats.push(action.payload);
            return {
                stats: Object.assign([], state.stats),
                selectedIndex: state.selectedIndex
            };
        }
        case StatActions.REMOVE_SUCCESS: {
            const toRemove = action.payload
            let newArray = state.stats.filter(stat => stat.name !== toRemove.name);

            return {
                stats: Object.assign([], newArray),
                selectedIndex: null
            };
        }
        case StatActions.ADD_MANY_SUCCESS: {
            return {
                stats: Object.assign([], action.payload),
                selectedIndex: null
            }
        }
        case StatActions.SELECT: {
            return {
                stats: state.stats,
                selectedIndex: action.payload
            };
        }
        case StatActions.ADD_MANY:
        case StatActions.ADD:
        case StatActions.UPDATE:
        case StatActions.REMOVE:
        default:
            return state;
    }
}

export const getStats       = (s: State) => s.stats;
export const getSelectedStatId = (s: State) => s.selectedIndex;

export const getSelectedStat =
    createSelector(getSelectedStatId, getStats, (id, stats) => stats[id]);
