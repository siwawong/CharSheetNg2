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
  SELECT:        type('[User] Select'),
  LINKCHAR:      type('[User] LinkChar'),
  UNLINKCHAR:    type('[User] UnlinkChar')
};

export class Add implements Action {
    type = ActionTypes.ADD;

    constructor(public payload: User) { } 
}

export class Remove implements Action {
    type = ActionTypes.REMOVE;

    constructor(public id: string) { }
}

export class Update implements Action {
    type = ActionTypes.UPDATE;

    constructor(public payload: User) { }
}

export class Select implements Action {
    type = ActionTypes.SELECT;

    constructor(public payload: string) { }
}

export class LinkChar implements Action {
    type = ActionTypes.LINKCHAR;

    constructor(public payload: {userKey: string, charKey: string}) {}
}

export class UnlinkChar implements Action {
    type = ActionTypes.UNLINKCHAR;

    constructor(public payload: {userKey: string, charKey: string}) {}
}

export type Actions
 = Add
 | Remove
 | Update
 | Select
 | LinkChar
 | UnlinkChar