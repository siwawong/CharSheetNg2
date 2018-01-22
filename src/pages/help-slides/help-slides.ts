import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../app/store/reducers';
import * as UserActions from '../../app/store/actions/user-actions';
import * as PreferencesActions from '../../app/store/actions/preferences-actions';

/**
 * Generated class for the HelpSlidesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

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
    [new PreferencesActions.ChangeInit(false), new UserActions.Load()].forEach(this.store.dispatch);
  }
}
