import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CharacterListPage } from '../character-list/character-list';
import { CreateStatPage } from '../create-stat/create-stat';

import { Store } from '@ngrx/store';

import { CharacterStat } from '../../app/models/stat-model';
import { Character } from '../../app/models/character-model';

import * as fromRoot from '../../app/store/reducers';
import * as StatActions from '../../app/store/actions/stat-actions';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private store: Store<fromRoot.State>) {
    this.store.dispatch(new StatActions.AddMany());
  }

  ngOnInit() {
    this.character = this.store.select(fromRoot.getCharacter);
    this.stats = this.store.select(fromRoot.getStats);
    this.selectedStat = this.store.select(fromRoot.getStatIndex);
  }

  selectStat(index: number) {
    this.store.dispatch(new StatActions.Select(index));
  }

  navCharList() {
    this.navCtrl.setRoot(CharacterListPage);
  }

  createStat() {
    this.navCtrl.push(CreateStatPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CharacterSheetPage');
  }

}
