import { Component } from '@angular/core';

/**
 * Generated class for the SplashscreenComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'splashscreen',
  templateUrl: 'splashscreen.html'
})
export class SplashscreenComponent {

  text: string;

  constructor() {
    console.log('Hello SplashscreenComponent Component');
    this.text = 'Hello World';
  }

}
