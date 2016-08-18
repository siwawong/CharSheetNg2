import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router'
import { HttpService } from './http.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  title = 'Ng2 CharSheet';
}
