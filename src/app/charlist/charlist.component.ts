import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../http.service';
import { Subscription } from 'rxjs/Rx';
import { Character } from '../character';
import { CharacterListService } from '../character-list.service';

@Component({
  selector: 'app-charlist',
  templateUrl: 'charlist.component.html',
  styleUrls: ['charlist.component.css'],
  //providers: [CharacterListService]
})
export class CharlistComponent implements OnInit {
  userSubscription: Subscription;
  userName: string;
  characters: Observable<Character[]>;
  
  constructor(private _http: HttpService, 
              private _router: Router,  
              private characterListService: CharacterListService, 
              private _activatedRouter: ActivatedRoute) {
    // when this class is created, set the user name
  }
// g3fv, name: Erin Mageton, url: erin

  ngOnInit() {
    this.userSubscription = this._activatedRouter.params.subscribe(params => {
      // this.userName = params['user'];
      this.characters = this.characterListService.getUserCharacters(params['users']);
    });
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
    this._router.navigateByUrl(this.userName + '/' + name)
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
