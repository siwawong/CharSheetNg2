import { Component } from '@angular/core';

/**
 * Generated class for the StatComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'stat',
  templateUrl: 'stat.html'
})
export class StatComponent {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }

}
