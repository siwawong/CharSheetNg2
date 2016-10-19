import { Action } from '@ngrx/store';
import { User } from '../models/user';
import { type } from '../util';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */
export const ActionTypes = {
  ADD:           type('[User] Add'),
  REMOVE:        type('[User] Remove'),
  UPDATE:        type('[User] Update'),
};

export class UserAdd implements Action {
    type = ActionTypes.ADD;

    constructor(public payload: User) { } 
}

export class UserRemove implements Action {
    type = ActionTypes.REMOVE;

    constructor(public id: string) { }
}

export class UserUpdate implements Action {
    type = ActionTypes.UPDATE;

    constructor(public payload: User) { }
}

export type Actions
 = UserAdd
 | UserRemove
 | UserUpdate