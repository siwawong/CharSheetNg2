import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Store, Action } from '@ngrx/store';

import { StorageService } from './services/storage.service';

import { AppMenuComponent } from '../components/app-menu/app-menu';

import * as fromRoot from './store/reducers';
import * as UserActions from './store/actions/user-actions';
// import { LoginUserPage } from '../pages/login-user/login-user';


@Component({
  templateUrl: 'app.component.html',
})
export class AppComponent {
  title = 'Ng4 CharSheet Store';
  rootPage:any;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private store: Store<fromRoot.State>,
              private storage: StorageService) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log(this.storage.getDriver());
      this.store.dispatch(new UserActions.Load());
      // const user = this.storage.getUserState();
      // const stats = this.storage.getStatState();
      // const nav = this.storage.getNavState();

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
