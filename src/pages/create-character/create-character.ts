import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app/store/reducers';
import * as CharacterActions from '../../app/store/actions/character-actions';

/**
 * Generated class for the CreateCharacterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-character',
  templateUrl: 'create-character.html',
})
export class CreateCharacterPage {
  private title = "Create A New Character";
  private addCharForm: FormGroup;
  private name: FormControl;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.name = new FormControl('', Validators.required);
    this.addCharForm = new FormGroup({
      name: this.name
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCharacterPage');
  }

  addCharacter() {
    this.store.dispatch(new CharacterActions.Create(this.name.value));
    this.navCtrl.pop();
  }

}
