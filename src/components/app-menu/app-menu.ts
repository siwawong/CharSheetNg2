import { Component, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../app/store/reducers';
import * as AuthActions from '../../app/store/actions/auth-actions';
import * as NavActions from '../../app/store/actions/nav-actions';

/**
 * Generated class for the AppDrawComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'app-menu',
  templateUrl: 'app-menu.html'
})
export class AppMenuComponent {
  @Input() content;

  constructor(private store: Store<fromRoot.State>) { }

  logout() {
    this.store.dispatch(new AuthActions.Delete());
  }

  charList() {
    this.store.dispatch(new NavActions.CharacterList());
  }
}
