import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, Navbar } from 'ionic-angular';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../app/store/reducers';
import * as StatActions from '../../app/store/actions/stat-actions';
import * as NavActions from '../../app/store/actions/nav-actions';

/**
 * Generated class for the CreateStatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-stat',
  templateUrl: 'create-stat.html',
})
export class CreateStatPage {
  @ViewChild(Navbar) navBar: Navbar;

  private title = "Create A New Stat";

  private name: FormControl;
  private value: FormControl;
  private maximum: FormControl;
  private type: FormControl;

  private addStatForm: FormGroup;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.name = new FormControl('', Validators.required);
    this.value = new FormControl('', Validators.required);
    this.maximum = new FormControl('');
    this.type = new FormControl('', Validators.required);
    
    this.addStatForm = new FormGroup({
      name: this.name,
      value: this.value,
      maximum: this.maximum,
      type: this.type
    });
  }

  createStat() {
    const newStat = {
      name: this.name.value,
      value: this.value.value,
      maximum: this.maximum.value,
      type: this.type.value
    };
    this.store.dispatch(new StatActions.Add(newStat));
    // this.navCtrl.pop();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CreateStatPage');
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.store.dispatch(new NavActions.Back());
    };
  }

}
