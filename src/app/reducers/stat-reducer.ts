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
            const toRemove = state.selectedIndex;
            const oldArray = state.stats;

            return {
                stats: [
                    ...oldArray.slice(0, toRemove),
                    oldArray[toRemove] = action.payload,
                    ...oldArray.slice(toRemove + 1)
                ],
                selectedIndex: null
            };
        }
        case StatActions.ADD_SUCCESS: {
            return {
                stats: [...state.stats, action.payload],
                selectedIndex: state.selectedIndex
            };
        }
        case StatActions.REMOVE_SUCCESS: {
            const toRemove = state.selectedIndex;
            const oldArray = state.stats;

            return {
                stats:  [...oldArray.slice(0, toRemove), ...oldArray.slice(toRemove + 1)],
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
