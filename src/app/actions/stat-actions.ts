import { Action } from '@ngrx/store';
import { CharacterStat } from '../models/stat-model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ADD =              '[Character-Stat] Add';
export const ADD_MANY =         '[Character-Stat] Add Many';
export const REMOVE =           '[Character-Stat] Remove';
export const UPDATE =           '[Character-Stat] Update';
export const SELECT =           '[Character-Stat] Select';
export const ADD_SUCCESS =      '[Character-Stat] Add Success';
export const ADD_MANY_SUCCESS = '[Character-Stat] Add Many Success';
export const REMOVE_SUCCESS =   '[Character-Stat] Remove Success';
export const UPDATE_SUCCESS =   '[Character-Stat] Update Success';

export class Add implements Action {
    readonly type = ADD;

    constructor(public payload: CharacterStat) { }
}

export class Remove implements Action {
    readonly type = REMOVE;

    constructor() { }
}

export class Update implements Action {
    readonly type = UPDATE;

    constructor(public payload: CharacterStat) { }
}

export class AddSuccess implements Action {
    readonly type = ADD_SUCCESS;

    constructor(public payload: CharacterStat) { }
}

export class RemoveSuccess implements Action {
    readonly type = REMOVE_SUCCESS;

    constructor() { }
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public payload: CharacterStat) { }
}

export class Select implements Action {
    readonly type = SELECT;

    constructor(public payload: number) { }
}

export class AddMany implements Action {
    readonly type = ADD_MANY;

    constructor() { }
}

export class AddManySuccess implements Action {
    readonly type = ADD_MANY_SUCCESS;

    constructor(public payload: CharacterStat[]) { }
}

export type All
    = Add
    | Remove
    | Update
    | Select
    | AddSuccess
    | RemoveSuccess
    | UpdateSuccess
    | AddMany
    | AddManySuccess;
