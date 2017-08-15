import { Component, Input } from '@angular/core';

/**
 * Generated class for the AppDrawComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'app-menu',
  templateUrl: 'app-menu.html'
})
export class AppMenuComponent {
  @Input() content;

  constructor() { }

}
