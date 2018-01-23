import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app/store/reducers/index';
// import { setTimeout } from 'timers';

@Component({
  selector: 'splashscreen',
  templateUrl: 'splashscreen.html'
})
export class SplashscreenComponent {
  splashToggle = false;
  loadSubscription: Subscription;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.loadSubscription = this.store.select(fromRoot.getPrefSplash).subscribe(() => {
        setTimeout(() => {
          this.splashToggle = true;
          this.loadSubscription.unsubscribe();
        }, 2000);
    });
  }
}
