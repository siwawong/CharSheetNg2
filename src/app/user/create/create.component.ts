import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as UserActions from '../../actions/user-actions';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateUserComponent implements OnInit {
  private createForm: FormGroup;
  private name: FormControl;
  private email: FormControl;
  private password1: FormControl;
  private password2: FormControl;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.name = new FormControl('', Validators.required);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password1 = new FormControl('', Validators.required);
    this.password2 = new FormControl('', Validators.required);

    this.createForm = new FormGroup({
      name: this.name,
      email: this.email,
      passwords: new FormGroup({
        password1: this.password1,
        password2: this.password2
      }, this.areEqual.bind(this))
    });
  }

  areEqual(group: FormGroup): {[s: string]: boolean} {
    if (this.password1.value !== this.password2.value) {
      return {'passesNotSame': true};
    }
  }

  create() {
    this.store.dispatch(new UserActions.Add({name: this.name.value, email: this.email.value, password: this.password1.value}));
  }


}
