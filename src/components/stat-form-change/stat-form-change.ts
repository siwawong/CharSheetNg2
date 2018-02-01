import { Component } from '@angular/core';

/**
 * Generated class for the StatFormChangeComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'stat-form-change',
  templateUrl: 'stat-form-change.html'
})
export class StatFormChangeComponent {

  text: string;

  constructor() {
    console.log('Hello StatFormChangeComponent Component');
    this.text = 'Hello World';
  }

}
