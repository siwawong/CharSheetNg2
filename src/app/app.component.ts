import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router'
import { HttpService } from './http.service'

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [HttpService]
})
export class AppComponent {
  title = 'Ng2 CharSheet';
}
