import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

// import { CharacterListService } from '../services/character-list.service';
// import { CharacterStatsService } from '../services/character-stats.service';
import { Character } from '../models/character';
import { CharacterStat } from '../models/character-stat';
import * as fromRoot from '../reducers';
import * as StatActions from '../actions/character-stat';
// import { StatComponent } from '../stat';

@Component({
  selector: 'app-charsheet',
  templateUrl: 'charsheet.component.html',
  styleUrls: ['charsheet.component.css'],
})
export class CharsheetComponent implements OnInit {
  private username: Observable<string>;
  private character: Observable<Character>;
  private stats: Observable<CharacterStat[]>;
  private selectedStat: Observable<number>;

  private addStatForm: FormGroup;
  private editStatForm: FormGroup;

  private name: FormControl;
  private value: FormControl;
  private maximum: FormControl;
  private type: FormControl;

  constructor(private store: Store<fromRoot.State>) {
    this.store.dispatch(new StatActions.AddMany());
  }

  ngOnInit() {
    this.username = this.store.select(fromRoot.getUsername);
    this.character = this.store.select(fromRoot.getCharacter);
    this.stats = this.store.select(fromRoot.getStats);
    this.selectedStat = this.store.select(fromRoot.getStatIndex);

    this.name = new FormControl('', Validators.required);
    this.value = new FormControl('', Validators.required);
    this.maximum = new FormControl('', Validators.required);
    this.type = new FormControl('', Validators.required);

    this.addStatForm = new FormGroup({
      name: this.name,
      value: this.value,
      maximum: this.maximum,
      type: this.type,
    });

    this.editStatForm = new FormGroup({
      name: new FormControl('')
    });
  }

  selectStat(index: number) {
    this.store.dispatch(new StatActions.Select(index));
  }

  addStat() {
    const statToAdd = {
      name: this.name.value,
      value: this.value.value,
      maximum: this.maximum.value,
      type: this.type.value
    };
    this.store.dispatch(new StatActions.Add(statToAdd));
  }

  ngOnDestroy() {
  }
}
