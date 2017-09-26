import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { IonicPage, Navbar } from 'ionic-angular';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../app/store/reducers';
import * as NavActions from '../../app/store/actions/nav-actions';

/**
 * Generated class for the PreferencesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preferences',
  templateUrl: 'preferences.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreferencesPage {
  @ViewChild(Navbar) navBar: Navbar;
  private title = 'Preferences';

  constructor(private store: Store<fromRoot.State>) {
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.store.dispatch(new NavActions.Back());
    }
  }

}
