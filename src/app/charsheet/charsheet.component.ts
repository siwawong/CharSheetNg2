import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { Character } from '../models/character-model';
import { CharacterStat } from '../models/stat-model';
import * as fromRoot from '../store/reducers';
import * as StatActions from '../store/actions/stat-actions';

@Component({
  selector: 'app-charsheet',
  templateUrl: 'charsheet.component.html',
  styles: [``],
})
export class CharsheetComponent implements OnInit {
  private username: Observable<string>;
  private character: Observable<Character>;
  private stats: Observable<CharacterStat[]>;
  private selectedStat: Observable<number>;

  private editName: FormControl;
  private editValue: FormControl;
  private editMaximum: FormControl;
  private editType: FormControl;

  private addStatForm: FormGroup;
  private editStatForm: FormGroup;

  constructor(private store: Store<fromRoot.State>) {
    this.store.dispatch(new StatActions.AddMany());
  }

  ngOnInit() {
    this.username = this.store.select(fromRoot.getUsername);
    this.character = this.store.select(fromRoot.getCharacter);
    this.stats = this.store.select(fromRoot.getStats);
    this.selectedStat = this.store.select(fromRoot.getStatIndex);

    this.editName = new FormControl('', Validators.required);
    this.editValue = new FormControl('', Validators.required);
    this.editMaximum = new FormControl('', Validators.required);
    this.editType = new FormControl('', Validators.required);

    this.addStatForm = new FormGroup({
      name: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
      maximum: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
    });

    this.editStatForm = new FormGroup({
      name: this.editName,
      value: this.editValue,
      maximum: this.editMaximum,
      type: this.editType,
    });
  }

  selectStat(stat: CharacterStat, index: number) {
    this.editName.setValue(stat.name);
    this.editValue.setValue(stat.value);
    this.editMaximum.setValue(stat.maximum);
    this.editType.setValue(stat.type);

    this.store.dispatch(new StatActions.Select(index));
  }

  addStat() {
    this.store.dispatch(new StatActions.Add(this.generateStat(this.addStatForm)));
    this.addStatForm.reset();
  }

  removeStat() {
    this.store.dispatch(new StatActions.Remove());
  }

  updateStat() {
    this.store.dispatch(new StatActions.Update(this.generateStat(this.editStatForm)));
    this.editStatForm.reset();
  }

  generateStat(group: FormGroup): CharacterStat {
    return {
      name: group.get('name').value,
      value: group.get('value').value,
      maximum: group.get('maximum').value,
      type: group.get('type').value
    };
  }
}
