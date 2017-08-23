import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { IonicPage } from 'ionic-angular';

// import { CharacterListPage } from '../character-list/character-list';
// import { CreateStatPage } from '../create-stat/create-stat';

import { Store } from '@ngrx/store';

import { CharacterStat } from '../../app/models/stat-model';
import { Character } from '../../app/models/character-model';

import * as fromRoot from '../../app/store/reducers';
import * as StatActions from '../../app/store/actions/stat-actions';
import * as NavActions from '../../app/store/actions/nav-actions';

/**
 * Generated class for the CharacterSheetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-character-sheet',
  templateUrl: 'character-sheet.html',
})
export class CharacterSheetPage {
  private character: Observable<Character>;
  private stats: Observable<CharacterStat[]>;
  private selectedStat: Observable<number>;

  private editStatForm: FormGroup;

  private name: FormControl;
  private value: FormControl;
  private maximum: FormControl;
  private type: FormControl;
  

  constructor(private store: Store<fromRoot.State>) {
    this.store.dispatch(new StatActions.AddMany());
  }

  ngOnInit() {
    this.character = this.store.select(fromRoot.getCharacter);
    this.stats = this.store.select(fromRoot.getStats);
    this.selectedStat = this.store.select(fromRoot.getStatId);

    this.name = new FormControl('', Validators.required);
    this.value = new FormControl('', Validators.required);
    this.maximum = new FormControl('');
    this.type = new FormControl('', Validators.required);

    this.editStatForm = new FormGroup({
      name: this.name,
      value: this.value,
      maximum: this.maximum,
      type: this.type
    });
    
  }

  selectStat(stat: CharacterStat, index: number) {
    this.name.setValue(stat.name);
    this.value.setValue(stat.value);
    this.maximum.setValue(stat.maximum);
    this.type.setValue(stat.type); 

    this.store.dispatch(new StatActions.Select(index));
  }

  // navCharList() {
  //   this.navCtrl.setRoot(CharacterListPage);
  // }

  removeStat() {
    this.store.dispatch(new StatActions.Remove());
  }

  updateStat() {
    this.store.dispatch(new StatActions.Update(this.generateStat()));
    this.editStatForm.reset();
  }

  createStat() {
    // this.navCtrl.push(CreateStatPage);
    this.store.dispatch(new NavActions.CreateStat());
  }

  generateStat(): CharacterStat {
    const group = this.editStatForm;
    return {
      name: group.get('name').value,
      value: group.get('value').value,
      maximum: group.get('maximum').value,
      type: group.get('type').value
    };
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CharacterSheetPage');
  }

}
