import { Component } from '@angular/core';
import { HttpService } from './services/http.service';
import { CharacterListService } from './services/character-list.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  // providers: [CharacterListService],
})
export class AppComponent {
  title = 'Ng2 CharSheet';
}
