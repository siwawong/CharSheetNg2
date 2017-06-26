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
export const ADD =    '[Character-Stat] Add';
export const REMOVE = '[Character-Stat] Remove';
export const UPDATE = '[Character-Stat] Update';

export class StatAdd implements Action {
    readonly type = ADD;

    constructor(public payload: CharacterStat) { } 
}

export class StatRemove implements Action {
    readonly type = REMOVE;

    constructor(public id: string) { }
}

export class StatUpdate implements Action {
    readonly type = UPDATE;

    constructor(public payload: CharacterStat) { }
}

export type Actions
 = StatAdd
 | StatRemove
 | StatUpdate
