import { Action } from '@ngrx/store';
import { User } from '../../models/user-model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */

export const ADD =              '[User] Add';
export const ADD_SUCCESS =      '[User] Add Success';
export const REMOVE =           '[User] Remove';
export const REMOVE_SUCCESS =   '[User] Remove Success';
export const UPDATE =           '[User] Update';
export const UPDATE_SUCCESS =   '[User] Update Success';

export class Add implements Action {
    readonly type = ADD;

    constructor(public payload: {name: string, email: string, password: string}) { }
}

export class AddSuccess implements Action {
    readonly type = ADD_SUCCESS;

    constructor(public payload: User) { }
}

export class Remove implements Action {
    readonly type = REMOVE;

    constructor(public payload: string) { }
}

export class RemoveSuccess implements Action {
    readonly type = REMOVE_SUCCESS;

    constructor() { }
}

export class Update implements Action {
    readonly type = UPDATE;

    constructor(public payload: {name: string, email: string, password: string}) { }
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public payload: User) { }
}

export type All
 = Add
 | AddSuccess
 | Remove
 | RemoveSuccess
 | Update
 | UpdateSuccess;
