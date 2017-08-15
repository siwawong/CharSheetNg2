import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppMenuComponent } from '../components/app-menu/app-menu';

import { LoginUserPage } from '../pages/login-user/login-user';


@Component({
  templateUrl: 'app.component.html',
})
export class AppComponent {
  title = 'Ng4 CharSheet Store';
  rootPage:any = LoginUserPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
