import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CreateUserPage } from '../create-user/create-user';

import { Store } from '@ngrx/store';

import * as AuthActions from '../../app/store/actions/auth-actions';
import * as fromRoot from '../../app/store/reducers';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-user',
  templateUrl: 'login-user.html',
})
export class LoginUserPage {
  private title = 'User Login';
  private email: FormControl;
  private password: FormControl;
  private loginForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', Validators.required);

    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  login() {
    // this.store.dispatch(new AuthActions.Create({email: this.email.value, password: this.password.value}));
  }

  create() {
    this.navCtrl.push(CreateUserPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }
}
