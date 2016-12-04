import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store } from '@ngrx/store';

import { User } from './models/user';
import { USERS } from './mock-users';
import * as fromRoot from './reducers';
import * as users from './actions/users';

@Injectable()
export class LoginService {
  // TODO - might make sense to move into it's own service a sort of 
  // 'user.service' that contains accessors to user information
  // user: BehaviorSubject<string>;
  users: Observable<User[]>;
  currentUser: User;
  currentUser$: Observable<User>;
  usersArr: User[];
  _id: number = 0;

  constructor(private store$: Store<fromRoot.State>) {
    this.users = store$.let(fromRoot.getUsers);
    this.users.subscribe(users => {
      this.usersArr = users;
    });

    this.currentUser$ = store$.let(fromRoot.getSelectedUser);
    this.currentUser$.subscribe(user => this.currentUser = user);

    USERS.map(user => {
      this.store$.dispatch(new users.Add(user));
    });
  }

  // TODO: Handle invalid usernames
  getUsers() {
    return Promise.resolve(USERS);
  }

  getCurrentUser() {
    return this.currentUser;
  }
  
  validateUserName(name: string) {
    let currentLogin: User;

    currentLogin = (this.usersArr) ? this.usersArr.find(user => user.login === name) : undefined;
    
    if(currentLogin !== undefined) {
      // select the current User
      this.store$.dispatch(new users.Select(currentLogin.id));
    }
    // return observable stream
    return currentLogin;
  }

  currentUserUrl(): string {
    return this.currentUser.login;
  }
}