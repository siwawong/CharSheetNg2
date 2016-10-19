import { Action } from '@ngrx/store';
import { CharacterStat } from '../models/character-stat';
import { type } from '../util';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */
export const ActionTypes = {
  ADD:           type('[Character] Add'),
  REMOVE:        type('[Character] Remove'),
  UPDATE:        type('[Character] Update'),
};

export class StatAdd implements Action {
    type = ActionTypes.ADD;

    constructor(public payload: CharacterStat) { } 
}

export class StatRemove implements Action {
    type = ActionTypes.REMOVE;

    constructor(public id: string) { }
}

export class StatUpdate implements Action {
    type = ActionTypes.UPDATE;

    constructor(public payload: CharacterStat) { }
}

export type Actions
 = StatAdd
 | StatRemove
 | StatUpdate
