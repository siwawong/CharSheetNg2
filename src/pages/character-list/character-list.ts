import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

// import { CreateCharacterPage } from '../create-character/create-character';
// import { CharacterSheetPage } from '../character-sheet/character-sheet';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../app/store/reducers';
// import * as AuthActions from '../../app/store/actions/auth-actions';
import * as CharacterActions from '../../app/store/actions/character-actions';
import * as NavActions from '../../app/store/actions/nav-actions';

import { Character } from '../../app/models/character-model';

/**
 * Generated class for the CharacterListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-character-list',
  templateUrl: 'character-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterListPage {
  private characters: Observable<Character[]>
  // private username: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    // this.store.dispatch(new CharacterActions.GetAll());   
  }

  ngOnInit() {
    this.characters = this.store.select(fromRoot.getCharacters);
    // this.username = this.store.select(fromRoot.getUsername);
  }

  selectCharacter(index: number) {
    this.store.dispatch(new CharacterActions.Select(index));
  }
  
  addCharacter() {
    this.store.dispatch(new NavActions.CreateCharacter());
  }

  removeCharacter() {
    
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CharacterListPage');
  }

}
