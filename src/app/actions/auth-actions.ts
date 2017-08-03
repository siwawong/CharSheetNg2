import { Action } from '@ngrx/store';

export const CREATE =           '[Auth] Create';
export const CREATE_SUCCESS =   '[Auth] Create Success';
export const DELETE =           '[Auth] Delete';
export const DELETE_SUCCESS =   '[Auth] Delete Success';

export class Create implements Action {
    readonly type = CREATE;
    constructor(public payload: {email: string, password: string}) { }
}

export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS;
    constructor(public payload: string) { }
}

export class Delete implements Action {
    readonly type = DELETE;
    constructor() { }
}

export class DeleteSuccess implements Action {
    readonly type = DELETE_SUCCESS;
    constructor() { }
}

export type All
    = Create
    | CreateSuccess
    | DeleteSuccess
    | Delete;
