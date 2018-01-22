import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../app/store/reducers';
import * as UserActions from '../../app/store/actions/user-actions';
import * as PrefActions from '../../app/store/actions/preferences-actions';

@IonicPage()
@Component({
  selector: 'page-help-slides',
  templateUrl: 'help-slides.html',
})
export class HelpSlidesPage {

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
  }

  closeHelp() {
    this.store.dispatch(new PrefActions.ChangeInit(false));
    this.store.dispatch(new UserActions.Load());
  }
}
