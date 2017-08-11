import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../store/reducers';
import * as AuthActions from '../store/actions/auth-actions';
import * as CharacterActions from '../store/actions/character-actions';

import { Character } from '../models/character-model';

@Component({
  selector: 'app-charlist',
  templateUrl: 'charlist.component.html',
  styles: [``],
})
export class CharlistComponent implements OnInit {
  private characters$: Observable<Character[]>;
  private username: Observable<string>;
  private name: FormControl;
  private addCharForm: FormGroup;

  constructor(private store: Store<fromRoot.State>) {
    this.store.dispatch(new CharacterActions.GetAll());
  }

  ngOnInit() {
    this.characters$ = this.store.select(fromRoot.getCharacters);
    this.username = this.store.select(fromRoot.getUsername);

    this.name = new FormControl('', Validators.required);

    this.addCharForm = new FormGroup({
      name: this.name
    });
  }

  selectCharacter(index: number) {
    this.store.dispatch(new CharacterActions.Select(index));
  }

  addCharacter() {
    this.store.dispatch(new CharacterActions.Create(this.name.value));
  }

  logout() {
    this.store.dispatch(new AuthActions.Delete());
  }

}
