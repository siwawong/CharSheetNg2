import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../app/store/reducers';
import * as NavActions from '../../app/store/actions/nav-actions';
import * as UserActions from '../../app/store/actions/user-actions';
import * as PrefActions from '../../app/store/actions/preferences-actions';

@IonicPage()
@Component({
  selector: 'page-help-slides',
  templateUrl: 'help-slides.html',
})
export class HelpSlidesPage {
  fromMenu = false;
  changeInitSub: Subscription;
  changeInitObj: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.changeInitSub = this.store.subscribe((state) => {
      this.fromMenu = state.pref.init;
    });
    this.changeInitObj = this.store.select(fromRoot.getPrefInit);
  }

  closeHelp() {
    if (this.fromMenu === true) {
      this.store.dispatch(new NavActions.Back());
    } else {
      this.store.dispatch(new PrefActions.ChangeInit(true));
      this.store.dispatch(new UserActions.Load()); 
    }
  }

  ngOnDestroy() {
    this.changeInitSub.unsubscribe();
  }
}
