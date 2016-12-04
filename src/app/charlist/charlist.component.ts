import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/first';

import { HttpService } from '../http.service';
import { Subscription } from 'rxjs/Rx';
import * as fromRoot from '../reducers';
import { LoginService } from '../login.service';
import { Character } from '../models/character';
import * as users from '../actions/users';
import { CharacterListService } from '../character-list.service';

@Component({
  selector: 'app-charlist',
  templateUrl: 'charlist.component.html',
  styleUrls: ['charlist.component.css'],
  //providers: [CharacterListService]
})
export class CharlistComponent implements OnInit {
  userSubscription: Subscription;
  characters$: Observable<Character[]>;
  userName: string;
  characters: Observable<Character[]>;
  
  constructor(private _http: HttpService, 
              private _router: Router,
              private loginService: LoginService,
              private store: Store<fromRoot.State>,
              private characterListService: CharacterListService, 
              private _activatedRouter: ActivatedRoute) {
    // when this class is created, set the user name
  }
// g3fv, name: Erin Mageton, url: erin

  ngOnInit() {
    this.userSubscription = this._activatedRouter.params.first().subscribe(params => {
      this.userName = params['user'];
      if (this.userName) {
        // set active user
        this.loginService.validateUserName(this.userName);
        this.characters$ = this.characterListService.getUserCharacters();
      } else {
        // re-route
        this._router.navigate(['/']);
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  addCharacter() {
    this._router.navigate(['addCharacter']);
  }

}
