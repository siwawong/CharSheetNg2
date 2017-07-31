import { Action } from '@ngrx/store';
import { User } from '../models/user';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */

export const ADD =        '[User] Add';
export const REMOVE =     '[User] Remove';
export const UPDATE =     '[User] Update';
export const SELECT =     '[User] Select';
export const LINKCHAR =   '[User] LinkChar';
export const UNLINKCHAR = '[User] UnlinkChar';


export class Add implements Action {
    readonly type = ADD;

    constructor(public payload: User) { }
}

export class Remove implements Action {
    readonly type = REMOVE;

    constructor(public id: string) { }
}

export class Update implements Action {
    readonly type = UPDATE;

    constructor(public payload: User) { }
}

export class Select implements Action {
    readonly type = SELECT;

    constructor(public payload: string) { }
}

// export class LinkChar implements Action {
//     readonly type = LINKCHAR;

//     constructor(public payload: {userKey: string, charKey: string}) {}
// }

// export class UnlinkChar implements Action {
//     readonly type= UNLINKCHAR;

//     constructor(public payload: {userKey: string, charKey: string}) {}
// }

export type All
 = Add
 | Remove
 | Update
 | Select;
