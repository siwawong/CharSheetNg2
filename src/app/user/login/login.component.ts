import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import * as AuthActions from '../../actions/auth-actions';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {
   private email: FormControl;
   private password: FormControl;
   private loginForm: FormGroup;

  constructor(private router: Router, private store: Store<fromRoot.State>) { }

  ngOnInit() {
      this.email = new FormControl('', [Validators.required, Validators.email]);
      this.password = new FormControl('', Validators.required);

      this.loginForm = new FormGroup({
        email: this.email,
        password: this.password
      });
  }

  reset() {
    this.email.reset();
    this.password.reset();
  }

  login() {
    this.store.dispatch(new AuthActions.Create({email: this.email.value, password: this.password.value}));
  }

}
