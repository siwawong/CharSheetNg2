import { Action } from '@ngrx/store';
import { Character } from '../models/character';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */
export const ADD =        '[Character] Add';
export const REMOVE =     '[Character] Remove';
export const UPDATE =     '[Character] Update';
export const SELECT =     '[Character] Select';
export const LINKSTAT =   '[Character] LinkStat';
export const UNLINKSTAT = '[Character] UnlinkStat';

export class Add implements Action {
    readonly type = ADD;

    constructor(public payload: Character) { }
};

export class Remove implements Action {
    readonly type = REMOVE;

    constructor(public id: string) { }
};

export class Update implements Action {
    readonly type = UPDATE;

    constructor(public payload: Character) { }
};

export class Select implements Action {
    readonly type = SELECT;

    constructor(public payload: string) { }
}

// export class LinkStat implements Action {
//     readonly type = LINKSTAT;

//     constructor(public payload: {charId: string, statId: string}) {}
// }

// export class UnlinkStat implements Action {
//     readonly type = UNLINKSTAT;

//     constructor(public payload: {charId: string, statId: string}) {}
// }

export type All
 = Add
 | Remove
 | Update
 | Select;
