import { Component } from '@angular/core';

/**
 * Generated class for the StatButtonChangeComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'stat-button-change',
  templateUrl: 'stat-button-change.html'
})
export class StatButtonChangeComponent {

  text: string;

  constructor() {
    console.log('Hello StatButtonChangeComponent Component');
    this.text = 'Hello World';
  }

}
