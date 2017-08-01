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
export const CREATE =           '[Character] Add';
export const CREATE_SUCCESS =   '[Character] Add Success';
export const GET =              '[Character] Get';
export const GET_SUCCESS =      '[Character] Get Success';
export const GET_ALL =          '[Character] Get All';
export const GET_ALL_SUCCESS =  '[Character] Get All Success';
export const REMOVE =           '[Character] Remove';
export const REMOVE_SUCCESS =   '[Character] Remove Success';
export const UPDATE =           '[Character] Update';
export const UPDATE_SUCCESS =   '[Character] Update Success';
export const SELECT =           '[Character] Select';
// export const LINKSTAT =     '[Character] LinkStat';
// export const UNLINKSTAT =   '[Character] UnlinkStat';

export class Create implements Action {
    readonly type = CREATE;

    constructor(public name: string) { }
};

export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS;

    constructor(public payload: Character) { }
};

export class Get implements Action {
    readonly type = GET;

    constructor(public id: string) { }
};

export class GetSuccess implements Action {
    readonly type = GET_SUCCESS;

    constructor(public payload: Character) { }
};

export class GetAll implements Action {
    readonly type = GET_ALL;

    constructor(public payload: string) { }
};

export class GetAllSuccess implements Action {
    readonly type = GET_ALL_SUCCESS;

    constructor(public payload: Character[]) { }
};

export class Remove implements Action {
    readonly type = REMOVE;

    constructor(public id: string) { }
};

export class RemoveSuccess implements Action {
    readonly type = REMOVE_SUCCESS;

    constructor(public id: string) { }
};

export class Update implements Action {
    readonly type = UPDATE;

    constructor(public id: string) { }
};

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;

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
 = Create
 | CreateSuccess
 | Get
 | GetSuccess
 | GetAll
 | GetAllSuccess
 | Remove
 | RemoveSuccess
 | Update
 | UpdateSuccess
 | Select;
