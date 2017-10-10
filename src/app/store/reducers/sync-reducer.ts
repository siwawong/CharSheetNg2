import { createSelector } from 'reselect';
import * as SyncActions from '../actions/sync-actions';

import { Change } from '../../models/sync-change-model';
import { CHANGETYPES } from '../../models/sync-type-model';

export interface SyncState {
    lastUpdate: number;
    charChanges: {[id: string]: Change};
    statChanges: {[id: string]: Change};
};

const initialState: SyncState = {
    lastUpdate: null,
    charChanges: {},
    statChanges: {}
};

// May not need to do generate timeStamp, just copy from item;
const genChange = (id: string, type: string): Change => {
    return {
        id,
        type,
        timeStamp: Date.now()
    };
};

export function reducer(state = initialState, action: SyncActions.All): SyncState {
    switch(action.type) {
        case SyncActions.ADD_CHARACTER: {
            const id = action.payload
            return {
                lastUpdate: state.lastUpdate,
                charChanges: Object.assign({}, state.charChanges, {[id]: genChange(id, CHANGETYPES.ADD)}),
                statChanges: state.statChanges
            };
        };
        case SyncActions.ADD_STAT: {
            const id = action.payload            
            return {
                lastUpdate: state.lastUpdate,
                charChanges: state.charChanges,
                statChanges: Object.assign({}, state.statChanges, {[id]: genChange(id, CHANGETYPES.ADD)})
            };
        };
        case SyncActions.UPDATE_CHARACTER: {
            let id = action.payload;
            let testChar = state.charChanges[id];
            if (testChar != null) {
                testChar.timeStamp = Date.now();
            } else {
                testChar = genChange(id, CHANGETYPES.UPDATE);
            };
            return {
                lastUpdate: state.lastUpdate,
                charChanges: Object.assign({}, state.charChanges, {[id]: testChar}),
                statChanges: state.statChanges
            };
        };
        case SyncActions.UPDATE_STAT: {
            let id = action.payload;
            let testStat = state.statChanges[id];
            if (testStat != null) {
                testStat.timeStamp = Date.now();
            } else {
                testStat = genChange(id, CHANGETYPES.UPDATE);
            };
            return {
                lastUpdate: state.lastUpdate,
                charChanges: state.charChanges,
                statChanges: Object.assign({}, state.statChanges, {[id]: testStat})
            };
        };
        case SyncActions.DELETE_STAT: {
            let id = action.payload;
            let testStat = state.statChanges[id];
            if (testStat != null) {
                testStat.type = CHANGETYPES.DELETE;
                testStat.timeStamp = Date.now();
            } else {
                testStat = genChange(id, CHANGETYPES.DELETE);
            };
            return {
                lastUpdate: state.lastUpdate,
                charChanges: state.charChanges,
                statChanges: Object.assign({}, state.statChanges, {[id]: testStat})
            };
        };
        case SyncActions.LOAD_SUCCESS: {
            let newState = action.payload;
            return {
                lastUpdate: newState.lastUpdate,
                charChanges: newState.charChanges,
                statChanges: newState.statChanges
            };
        };
        case SyncActions.SYNC_UP_SUCCESS: {
            return {
                lastUpdate: Date.now(),
                charChanges: {},
                statChanges: {}
            };
        };        
        case SyncActions.LOAD:
        case SyncActions.LOAD_ERROR:
        case SyncActions.SAVE:
        case SyncActions.SAVE_ERROR:
        case SyncActions.SAVE_SUCCESS:
        case SyncActions.SYNC:
        case SyncActions.SYNC_DOWN:
        case SyncActions.SYNC_DOWN_ERROR:
        case SyncActions.SYNC_UP:
        case SyncActions.SYNC_UP_ERROR:
        default:
            return state;
    };
};

export const getLastSync = (state: SyncState) => state.lastUpdate;
export const getCharSync = (state: SyncState) => state.charChanges;
export const getStateSync = (state: SyncState) => state.statChanges;
