import { Action } from '@ngrx/store';

// Add Successes and Errors?

export const CREATE_USER      = '[Nav] Create User';
export const LOGIN            = '[Nav] Login';
export const CHARACTER_LIST   = '[Nav] Character List';
export const CREATE_CHARACTER = '[Nav] Create Character';
export const CHARACTER_SHEET  = '[Nav] Character Sheet';
export const CREATE_STAT      = '[Nav] Create Stat';
export const BACK             = '[Nav] Back';
export const PREFERENCES      = '[Nav] Preferences';

// export const LOAD             = '[Nav] Load';
// export const LOAD_SUCCESS     = '[Nav] Load Success';
// export const LOAD_ERROR       = '[Nav] Load Error';
// export const LOAD_NONE        = '[Nav] Load None';

export class CreateUser implements Action {
    readonly type = CREATE_USER;
    constructor() { }
}

export class Login implements Action {
    readonly type = LOGIN;
    constructor() { }
}

export class CharacterList implements Action {
    readonly type = CHARACTER_LIST;
    constructor() { }
}

export class CreateCharacter implements Action {
    readonly type = CREATE_CHARACTER;
    constructor() { }
}

export class CharacterSheet implements Action {
    readonly type = CHARACTER_SHEET;
    constructor() { }
}

export class CreateStat implements Action {
    readonly type = CREATE_STAT;
    constructor() { }
}

export class Back implements Action {
    readonly type = BACK;
    constructor() { }
}

export class Preferences implements Action {
    readonly type = PREFERENCES;
    constructor() { }
}

// export class Load implements Action {
//     readonly type = LOAD;
//     constructor() { }
// }

// export class LoadSuccess implements Action {
//     readonly type = LOAD_SUCCESS;
//     constructor(public payload: {root: string, stack: string}) { }
// }

// export class LoadError implements Action {
//     readonly type = LOAD_ERROR;
//     constructor() { }
// }

// export class LoadNone implements Action {
//     readonly type = LOAD_NONE;
//     constructor() { }
// }

export type All
    = CreateUser
    | Login
    | CharacterList
    | CreateCharacter
    | CharacterSheet
    | CreateStat
    | Back
    | Preferences;
    // | Load
    // | LoadSuccess
    // | LoadError
    // | LoadNone;
