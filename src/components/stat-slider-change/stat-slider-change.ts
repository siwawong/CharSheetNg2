import { Component } from '@angular/core';

/**
 * Generated class for the StatSliderChangeComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'stat-slider-change',
  templateUrl: 'stat-slider-change.html'
})
export class StatSliderChangeComponent {

  text: string;

  constructor() {
    console.log('Hello StatSliderChangeComponent Component');
    this.text = 'Hello World';
  }

}
