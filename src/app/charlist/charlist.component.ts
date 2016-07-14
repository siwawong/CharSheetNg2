import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router'
import { HttpService } from '../http.service';

export interface Character {
  url: string;
  id: string;
  name: string;
}

@Component({
  moduleId: module.id,
  selector: 'app-charlist',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'charlist.component.html',
  styleUrls: ['charlist.component.css']
})
export class CharlistComponent implements OnInit {
  userName: string = 'fritz';
  
  characters: Array<Character> = [ {
      url: 'erin',
      id: 'g3fv',
      name: 'Erin Mageton'
    }
  ];
  
  constructor(private _http: HttpService, private _router: Router) {
    // when this class is created, set the user name
  }
// g3fv, name: Erin Mageton, url: erin

  ngOnInit() {
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
