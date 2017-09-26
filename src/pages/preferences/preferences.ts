import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IonicPage, Navbar, AlertController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../app/store/reducers';
import * as NavActions from '../../app/store/actions/nav-actions';
import * as PrefActions from '../../app/store/actions/preferences-actions';

import * as PREFERENCES from '../../app/models/preferences-model';

/**
 * Generated class for the PreferencesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preferences',
  templateUrl: 'preferences.html'
})
export class PreferencesPage {
  @ViewChild(Navbar) navBar: Navbar;
  private title = 'Preferences';
  private themeSub: Subscription;
  private themeVal: string;
  private modeSub: Subscription;
  private modeVal: string;
  private intervalSub: Subscription;
  private intervalVal: number;

  constructor(private store: Store<fromRoot.State>, public alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.themeSub = this.store.select(fromRoot.getPrefTheme).subscribe((value) => {
      this.themeVal = value;
    });
    this.modeSub = this.store.select(fromRoot.getPrefMode).subscribe((value) => {
      this.modeVal = value;
    });
    this.intervalSub = this.store.select(fromRoot.getPrefInterval).subscribe((value) => {
      this.intervalVal = value;
    });
  }

  ngOnDestroy() {
    this.themeSub.unsubscribe();
    this.modeSub.unsubscribe();
    this.intervalSub.unsubscribe();
  }

  themeAlert() {
    let alert = this.alertCtrl.create();
    alert.setSubTitle('Choose A Theme');
    for (let theme in PREFERENCES.THEME) {
      alert.addInput({
        type: 'radio',
        label: `${PREFERENCES.THEME[theme]}`,
        value: PREFERENCES.THEME[theme],
        checked: this.themeVal === PREFERENCES.THEME[theme] ? true: false
      });
    }
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        // this.store.dispatch(new PrefActions.ChangeTheme(data));
        console.log(data);
      }
    });
    alert.present();
  }

  modeAlert() {
    let alert = this.alertCtrl.create();
    alert.setSubTitle('Choose Connection Mode');
    alert.addInput({
      type: 'radio',
      label: PREFERENCES.MODE.OFFLINE,
      value: PREFERENCES.MODE.OFFLINE,
      checked: this.modeVal === PREFERENCES.MODE.OFFLINE ? true: false
    });
    alert.addInput({
      type: 'radio',
      label: PREFERENCES.MODE.ONLINE,
      value: PREFERENCES.MODE.ONLINE,
      checked: this.modeVal === PREFERENCES.MODE.ONLINE ? true: false
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        //this.store.dispatch(new PrefActions.ChangeMode(data));
        console.log(data);
      }
    });
    alert.present();
  }

  intervalAlert() {
    let alert = this.alertCtrl.create();
    alert.setSubTitle('Choose An Upload Interval');
    for (let interval in PREFERENCES.INTERVAL) {
      alert.addInput({
        type: 'radio',
        label: `${PREFERENCES.INTERVAL[interval] / 1000} mins`,
        value: PREFERENCES.INTERVAL[interval],
        checked: this.intervalVal === PREFERENCES.INTERVAL[interval] ? true: false
      });
    }
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        // this.store.dispatch(new PrefActions.ChangeTimer(data));
        console.log(data);
      }
    });
    alert.present();
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.store.dispatch(new NavActions.Back());
    }
  }

}
