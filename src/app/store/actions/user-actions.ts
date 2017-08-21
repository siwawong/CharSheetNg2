import { Action } from '@ngrx/store';
import { UserState } from '../reducers/user-reducer';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */

export const CREATE         = '[User] Create';
export const CREATE_SUCCESS = '[User] Create Success';
export const DELETE         = '[User] Delete';
export const DELETE_SUCCESS = '[User] Delete Success';
export const LOGIN          = '[User] Login';
export const LOGIN_SUCCESS  = '[User] Login Success';

export class Create implements Action {
    readonly type = CREATE;

    constructor(public payload: {name: string, email: string, password: string}) { }
}

export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS;

    constructor(public payload: UserState) { }
}

export class Delete implements Action {
    readonly type = DELETE;

    constructor() { }
}

export class DeleteSuccess implements Action {
    readonly type = DELETE_SUCCESS;

    constructor() { }
}

export class Login implements Action {
    readonly type = LOGIN;

    constructor(public payload: {email: string, password: string}) { }
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;

    constructor(public payload: UserState) { }
}

export type All
 = Create
 | CreateSuccess
 | Delete
 | DeleteSuccess
 | Login
 | LoginSuccess;
