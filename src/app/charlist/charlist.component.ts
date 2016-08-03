import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router'
import { HttpService } from '../http.service';
import { Character } from '../character';
import { CharacterListService } from '../character-list.service';

@Component({
  moduleId: module.id,
  selector: 'app-charlist',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'charlist.component.html',
  styleUrls: ['charlist.component.css'],
  providers: [CharacterListService]
})
export class CharlistComponent implements OnInit {
  userName: string = 'andy';
  characters: Character[];
  
  constructor(private _http: HttpService, private _router: Router, private characterListService: CharacterListService) {
    // when this class is created, set the user name
  }
// g3fv, name: Erin Mageton, url: erin

  ngOnInit() {
    this.characterListService.getUserCharacters(this.userName)
      .then(userCharacters => this.characters = userCharacters);
  }
  
  onClick(name: string) {
    // get request for the url coming in from the event
    // address is: url + .json
    // example: maragorah.com/data/fritz/erin.json
    // let fullUrl = 'margorah.com/data/' + this.userName + '/' + url + '.json';
    // characterSheet/erin
    // :name = erin
    // 
    // route to the next page
    this._router.navigateByUrl('characterSelect/' + name)
  }

}
