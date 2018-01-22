import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { StorageService } from './services/storage.service';

import { AppMenuComponent } from '../components/app-menu/app-menu';

import * as fromRoot from './store/reducers';
import * as UserActions from './store/actions/user-actions';
import * as PreferencesActions from './store/actions/preferences-actions';

@Component({
  templateUrl: 'app.component.html',
})
export class AppComponent {
  title = 'Ng4 CharSheet Store';
  rootPage:any;
  init: Observable<boolean>;
  private currentTheme: Observable<string>;
  help: boolean = false;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private store: Store<fromRoot.State>,
              private storage: StorageService) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // console.log(this.storage.getDriver());
      this.store.dispatch(new PreferencesActions.Load());
      // this.store.dispatch(new UserActions.Load());
      // get preferences and see if we are in an initial state
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit() {
    this.currentTheme = this.store.select(fromRoot.getPrefTheme);
    this.init = this.store.select(fromRoot.getPrefInit);
    this.init.subscribe( isInit => {
      if (isInit) {
        this.showHelp(true);
      }
    });
  }

  showHelp(help: boolean) {
    if (help) {
      this.help = true;
    }
  }

  closeHelp() {
    this.help = false;
    this.store.dispatch(new PreferencesActions.ChangeInit(false));
  }
}
