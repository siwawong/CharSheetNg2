import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, Navbar } from 'ionic-angular';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../app/store/reducers';
import * as CharacterActions from '../../app/store/actions/character-actions';
import * as NavActions from '../../app/store/actions/nav-actions';

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
  @ViewChild(Navbar) navBar: Navbar;
  
  private title = "Create A New Character";
  private addCharForm: FormGroup;
  private name: FormControl;
  
  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.name = new FormControl('', Validators.required);
    this.addCharForm = new FormGroup({
      name: this.name
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CreateCharacterPage');
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.store.dispatch(new NavActions.Back());
    };
  }

  addCharacter() {
    this.store.dispatch(new CharacterActions.Create(this.name.value));
    // this.navCtrl.pop();
  }

}
