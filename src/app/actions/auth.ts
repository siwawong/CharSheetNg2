import { Action } from '@ngrx/store';

export const LOGIN =            '[Auth] Login';
export const LOGIN_SUCCESS =    '[Auth] Login Success';
export const CREATE =           '[Auth] Create';
export const CREATE_SUCCESS =   '[Auth] Create Success';
export const LOGOUT =           '[Auth] Logout';

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: {email: string, password: string}) { }
}

export class Create implements Action {
    readonly type = LOGIN;
    constructor(public payload: {email: string, password: string}) { }
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public auth: string) { }
}

export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS;
    constructor(public auth: string) { }
}

export class Logout implements Action {
    readonly type = LOGOUT;
    constructor() { }
}

export type All
    = Create
    | CreateSuccess
    | Login
    | LoginSuccess
    | Logout;
