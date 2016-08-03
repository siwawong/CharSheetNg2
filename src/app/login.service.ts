import { Injectable } from '@angular/core';

import { User } from './User';
import { USERS } from './mock-users';

@Injectable()
export class LoginService {
  // TODO: Handle invalid usernames
  getUsers() {
    return Promise.resolve(USERS);
  }
  getUser(name: string) {
    return this.getUsers().then(users => users.find(user => user.login === name));
  }
  getUserName(name: string) {
    let currentLogin: string;
    return this.getUser(name)
      .then(user => currentLogin = user.login)
      .catch(user => currentLogin = "Invalid");
  }
}