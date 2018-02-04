import { Component } from '@angular/core';

/**
 * Generated class for the EditStatComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'edit-stat',
  templateUrl: 'edit-stat.html'
})
export class EditStatComponent {

  text: string;

  constructor() {
    console.log('Hello EditStatComponent Component');
    this.text = 'Hello World';
  }

}
