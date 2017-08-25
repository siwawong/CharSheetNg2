import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterSheetPage {
  private character: Observable<Character>;
  private stats: Observable<CharacterStat[]>;
  private selectedStatId: Observable<string>;
  private statSub: Subscription;
  private btnView = false;
  private statId: string;

  private editStatForm: FormGroup;

  private name: FormControl;
  private value: FormControl;
  private maximum: FormControl;
  private type: FormControl;
  

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.character = this.store.select(fromRoot.getCharacter);
    this.stats = this.store.select(fromRoot.getStats);
    this.selectedStatId = this.store.select(fromRoot.getStatId);

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

    this.statSub = this.store.select(fromRoot.getStat).subscribe((stat) => {
      // initStat = stat;
      if (stat) {
        this.statId = stat.id;
        this.name.setValue(stat.name);
        this.value.setValue(stat.value);
        this.maximum.setValue(stat.maximum);
        this.type.setValue(stat.type);
        this.btnView = true;
      } else {
        this.btnView = false;
      }
    });

    this.store.next(new StatActions.UpdateError())

    // this.statSubscription = this.store.select(fromRoot.getStat).subscribe((stat) => {
    //   this.name.setValue(stat.name);

    // });   
  }

  selectStat(stat: CharacterStat, index: number) {
    this.name.setValue(stat.name);
    this.value.setValue(stat.value);
    this.maximum.setValue(stat.maximum);
    this.type.setValue(stat.type); 

    // console.log(`stat: ${stat}, index: ${index}`);
    this.store.dispatch(new StatActions.Select(index));
  }

  // navCharList() {
  //   this.navCtrl.setRoot(CharacterListPage);
  // }

  removeStat() {
    this.store.dispatch(new StatActions.Remove(this.statId));
  }

  updateStat(stat) {
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
      id: this.statId,
      name: group.get('name').value,
      value: group.get('value').value,
      maximum: group.get('maximum').value,
      type: group.get('type').value
    };
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CharacterSheetPage');
  }

  ngOnDestroy() {
    this.statSub.unsubscribe();
  }

}
