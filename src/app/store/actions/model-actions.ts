import { Action } from '@ngrx/store';

export const ADD                        = 'Add';
// export const ADD_ERROR                  = 'Add Error';
export const ADD_NETWORK                = 'Add Network';
export const ADD_NETWORK_SUCCESS        = 'Add Network Success';
export const ADD_NETWORK_ERROR          = 'Add Network Error';

export const SAVE                       = 'Save';
export const SAVE_ERROR                 = 'Save Error';

export const SAVE_META                  = 'Save Meta';
export const SAVE_META_ERROR            = 'Save Meta Error';

export const SAVE_MANY                  = 'Save Many';
export const SAVE_MANY_ERROR            = 'Save Many Error';

export const LOAD_MANY                  = 'Load Many';
export const LOAD_MANY_SUCCESS          = 'Load Many Success'
export const LOAD_MANY_NONE             = 'Load Many None';
export const LOAD_MANY_ERROR            = 'Load Many Error';
export const LOAD_MANY_NETWORK          = 'Load Many Network';
export const LOAD_MANY_NETWORK_SUCCESS  = 'Load Many Network Success';
export const LOAD_MANY_NETWORK_ERROR    = 'Load Many Network Error';

export const LOGOUT                     = 'Logout';

export const REMOVE                     = 'Remove';
// export const REMOVE_ERROR               = 'Remove Error';
export const REMOVE_NETWORK             = 'Remove Network';
export const REMOVE_NETWORK_SUCCESS     = 'Remove Network Success';
export const REMOVE_NETWORK_ERROR       = 'Remove Network Error';

export const REMOVE_ALL                 = 'Remove All';
// export const REMOVE_ALL_ERROR           = 'Remove All Error';
export const REMOVE_ALL_NETWORK         = 'Remove All Network';
export const REMOVE_ALL_NETWORK_SUCCESS = 'Remove All Network Success';
export const REMOVE_ALL_NETWORK_ERROR   = 'Remove All Network Error';

export const UPDATE                     = 'Update';
// export const UPDATE_ERROR               = 'Update Error';
export const UPDATE_NETWORK             = 'Update Network';
export const UPDATE_NETWORK_SUCCESS     = 'Update Network Success';
export const UPDATE_NETWORK_ERROR       = 'Update Network Error';

export const UPDATE_TIME                = 'Update Time';

export const SELECT                     = 'Select';
export const UNSELECT                   = 'Unselect';
export const SELECT_ERROR               = 'Select Error';

// export interface Action {
//     type: string;
// }

export class Model <T> {
    static ACTIONS: {
        ADD: 'Add',
        ADD_NETWORK: 'Add Network',
        ADD_NETWORK_SUCCESS: 'Add Network Success',
        ADD_NETWORK_ERROR: 'Add Network Error',
        SAVE: 'Save',
        SAVE_ERROR: 'Save Error',
        SAVE_META: 'Save Meta',
        SAVE_META_ERROR: 'Save Meta Error',
        LOAD_MANY: 'Load Many',
        LOAD_MANY_SUCCESS: 'Load Many Success',
        LOAD_MANY_NONE: 'Load Many None',
        LOAD_MANY_ERROR: 'Load Many Error',
        LOAD_MANY_NETWORK: 'Load Many Network',
        LOAD_MANY_NETWORK_SUCCESS: 'Load Many Network Success',
        LOAD_MANY_NETWORK_ERROR: 'Load Many Network Error',
        REMOVE: 'Remove',
        REMOVE_NETWORK: 'Remove Network',
        REMOVE_NETWORK_SUCCESS: 'Remove Network Success',
        REMOVE_NETWORK_ERROR: 'Remove Network Error',
        REMOVE_ALL: 'Remove All',
        REMOVE_ALL_NETWORK: 'Remove All Network',
        REMOVE_ALL_NETWORK_SUCESS: 'Remove All Network Success',
        REMOVE_ALL_NETWORK_ERROR: 'Remove All Network Error',
        UPDATE: 'Update',
        UPDATE_NETWORK: 'Update Network',
        UPDATE_NETWORK_SUCCESS: 'Update Network Success',
        UPDATE_NETWORK_ERROR: 'Update Network Error',
        UPDATE_TIME: 'Update Time',
        SELECT: 'Select',
        UNSELECT: 'Unselect';
        SELECT_ERROR: 'Select Error'
    }
    model: string;
    Action: {[action: string]: string};

    constructor(model: string, custom_actions: {[action: string]: string}) {
        this.model = model;
        this.Action = {...Model.ACTIONS, ...custom_actions}
    }

    Add(payload: string) { return new Add(this.model + ADD, payload)}
    AddNetwork(payload: string) { return new AddNetwork(this.model + ADD_NETWORK, payload); }
    AddNetworkError() { 
        return new AddNetworkError(this.model + ADD_NETWORK_ERROR);
    }

    Save(payload: T) { return new Save<T>(this.model + SAVE, payload); }
    SaveError() { return new SaveError(this.model + SAVE_ERROR); }
    SaveMetaError() { return new SaveMetaError(this.model + SAVE_META_ERROR); }
    SaveMany(payload: T[]) { return new SaveMany<T>(this.model + SAVE_MANY, payload) }
    SaveManyError() { return new SaveManyError(this.model + SAVE_MANY_ERROR) }
    
    LoadMany(payload: T[]) { return new LoadMany<T>(this.model + LOAD_MANY, payload); }
    LoadManySuccess(payload: {models: any, selected: string}) {
        return new LoadManySuccess(this.model + LOAD_MANY_SUCCESS, payload)
    }
    LoadManyNone() { return new LoadManyNone(this.model + LOAD_MANY_NONE); }
    LoadManyError() { return new LoadManyError(this.model + LOAD_MANY_ERROR); }
    LoadManyNetwork() { return new LoadManyNetwork(this.model + LOAD_MANY_NETWORK); }
    LoadManyNetworkError() { return new LoadManyNetworkError(this.model + LOAD_MANY_NETWORK_ERROR); }


}

class Add<T> implements Action {
    constructor(public type: string, public payload: T) { }
}

class AddNetwork<T> implements Action {
    constructor(public type: string, public payload: string) { }
}

class AddNetworkError implements Action {
    constructor(public type: string) { }
};

class Save<T> implements Action {
    constructor(public type: string, public payload: T) { }
};

class SaveError implements Action {
    constructor(public type: string) { }
};

class SaveMeta implements Action {
    constructor(public type: string) { }
};

export class SaveMetaError implements Action {
    constructor(public type: string) { }
};

export class SaveMany<T> implements Action {
    constructor(public type, public payload: T[]) { }
};

export class SaveManyError<T> implements Action {
    constructor(public type: string) { }
};

export class LoadManyError implements Action {
    readonly type = LOAD_MANY_ERROR;

    constructor() { }
};

export class LoadMany<T> implements Action {
    constructor(public type: string, public payload: T[]) { }
};

export class LoadManySuccess implements Action {
    constructor(public type: string, public payload: {models: any, selected: string}) { }
};

export class LoadManyNone implements Action {
    readonly type = LOAD_MANY_NONE;

    constructor(public type: string) { }
};

export class LoadManyNetwork implements Action {
    readonly type = LOAD_MANY_NETWORK;

    constructor() { }
};

export class LoadManyNetworkSuccess implements Action {
    readonly type = LOAD_MANY_NETWORK_SUCCESS;

    constructor(public payload: Character[]) { }
};

export class LoadManyNetworkError implements Action {
    readonly type = LOAD_MANY_NETWORK_ERROR;

    constructor() { }
};