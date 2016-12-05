import { Action } from '@ngrx/store';
import { Character } from '../models/character';
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
  SELECT:        type('[Character] Select'),
  LINKSTAT:      type('[Character] LinkStat'),
  UNLINKSTAT:    type('[Character] UnlinkStat')
};

export class Add implements Action {
    type = ActionTypes.ADD;

    constructor(public payload: Character) { } 
};

export class Remove implements Action {
    type = ActionTypes.REMOVE;

    constructor(public id: string) { }
};

export class Update implements Action {
    type = ActionTypes.UPDATE;

    constructor(public payload: Character) { }
};

export class Select implements Action {
    type = ActionTypes.SELECT;

    constructor(public payload: string) { }
}

export class LinkStat implements Action {
    type = ActionTypes.LINKSTAT;

    constructor(public payload: {charId: string, statId: string}) {}
}

export class UnlinkStat implements Action {
    type = ActionTypes.UNLINKSTAT;

    constructor(public payload: {charId: string, statId: string}) {}
}

export type Actions
 = Add
 | Remove
 | Update
 | Select
 | LinkStat
 | UnlinkStat