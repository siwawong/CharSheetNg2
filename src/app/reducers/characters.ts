import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import * as character from '../actions/character';
import { Character } from '../models/character';

export interface State {
    ids: string[];
    entities: { [id: string]: Character};
    selectedCharId: string | null;
};

const initialState: State = {
    ids: [],
    entities: {},
    selectedCharId: null,
};

export function reducer(state = initialState, action: character.Actions): State {
    switch (action.type) {
        case character.ActionTypes.ADD: {
            const newChar = action.payload;

            return {
                ids: [...state.ids, newChar.id],
                entities: Object.assign({}, state.entities, {[newChar.id]: newChar}),
                selectedCharId: state.selectedCharId,
            }
        }
        case character.ActionTypes.UPDATE: {
            const updatedChar = action.payload;

            return {
                ids: [...state.ids],
                entities: Object.assign({}, state.entities, {[updatedChar.id]: updatedChar}),
                selectedCharId: state.selectedCharId
            }
        }

        case character.ActionTypes.REMOVE: {
            const id = action.id;
            const selectedCharId = (action.id === state.selectedCharId) ? null : state.selectedCharId;

            return {
                ids: state.ids.filter(id => id !== id),
                entities: Object.assign({}, state.entities, {[id]: undefined}),
                selectedCharId: selectedCharId
            }
        }
        case character.ActionTypes.SELECT: {
            return {
                ids: state.ids,
                entities: state.entities,
                selectedCharId: action.payload
            }
        }
        case character.ActionTypes.LINKSTAT: {
            let newChar = Object.assign({}, state.entities[action.payload.charId]);
            let newEntities = Object.assign({}, state.entities);

            newChar.statIds = [... newChar.statIds, action.payload.statId];
            newEntities[action.payload.charId] = newChar;

            return {
                ids: state.ids,
                entities: newEntities,
                selectedCharId: state.selectedCharId
            }
        }

        case character.ActionTypes.UNLINKSTAT: {
            let newChar = Object.assign({}, state.entities[action.payload.charId]);
            let newEntities = Object.assign({}, state.entities);

            newChar.statIds = newChar.statIds.filter(id => id !== action.payload.statId);
            newEntities[action.payload.charId] = newChar;

            return {
                ids: state.ids,
                entities: newEntities,
                selectedCharId: state.selectedCharId
            }
        }

        default:
            return state;
    }
};

export function getEntities(state$: Observable<State>) {
    return state$.select(s => s.entities);
};

export function getIds(state$: Observable<State>) {
    return state$.select(s => s.ids);
};

export function getSelectedCharacterId(state$: Observable<State>) {
    return state$.select(s => s.selectedCharId);
};

export function getCharacters(state$: Observable<State>) {
    return combineLatest< string[], {[id: string]: Character} >(
            state$.let(getIds),
            state$.let(getEntities)
        )
        .map(([ ids, entities ]) => ids.map(id => entities[id]));
};


export function getSelectedCharacter(state$: Observable<State>) {
    return combineLatest<string, {[id: string]: Character}>(
        state$.let(getSelectedCharacterId),
        state$.let(getEntities)
    )
    .map(([id, characters]) => characters[id]);
}
