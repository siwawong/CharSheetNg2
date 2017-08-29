import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { IonicPage } from 'ionic-angular';

import { Store } from '@ngrx/store';

import { CharacterStat } from '../../app/models/stat-model';
import { Character } from '../../app/models/character-model';

import * as fromRoot from '../../app/store/reducers';
import * as StatActions from '../../app/store/actions/stat-actions';
import * as NavActions from '../../app/store/actions/nav-actions';

const RANGETIMEOUT = 1500;
const EVENTDEBOUNCE = 200;

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
  private currentStat: Observable<CharacterStat>;

  private btnView = false; 
  private statSub: Subscription;
  private statId: string;

  private timeoutRef;
  private rangeValue: number;
  private rangeMin: number;
  private rangeMax: number;
  private rangeStep: number;

  private editStatForm: FormGroup;

  private name: FormControl;
  private value: FormControl;
  private maximum: FormControl;
  private type: FormControl;
  

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
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
      if (stat) {
        this.statId = stat.id;
        this.name.setValue(stat.name);
        this.value.setValue(stat.value);
        // this.rangeValue = stat.value;
        this.maximum.setValue(stat.maximum);
        this.type.setValue(stat.type);
        this.btnView = true;
        this.calcRange(stat);
      } else {
        this.btnView = false;
      }
    });

    this.character = this.store.select(fromRoot.getCharacter);
    this.stats = this.store.select(fromRoot.getStats);
    this.selectedStatId = this.store.select(fromRoot.getStatId);
    this.currentStat = this.store.select(fromRoot.getStat);
  }

  selectStat(stat: CharacterStat, index: number) {
    this.name.setValue(stat.name);
    this.value.setValue(stat.value);
    this.maximum.setValue(stat.maximum);
    this.type.setValue(stat.type); 

    this.store.dispatch(new StatActions.Select(index));
    this.calcRange(stat);
  }

  unselectStat() {
    this.store.dispatch(new StatActions.Unselect());
    this.rangeValue = 0;
  }

  calcStep(statVal: number) {
    const tempCheck = Math.abs(statVal);
    if (tempCheck > 999) {
      this.rangeStep = Math.round(Math.abs(tempCheck / 10) * .1);      
    } else {
      this.rangeStep = 1;
    }
    console.log('Step: ' + this.rangeStep);
  }

  calcRange(stat: CharacterStat) {
    if (stat.maximum < 1) {
      this.rangeMax = Math.abs(3 * stat.value);
    } else {
      this.rangeMax = stat.maximum;
    }
    console.log('Max: ' + this.rangeMax);
    if (stat.maximum < 1) {
      this.rangeMin = this.rangeValue - Math.abs(this.rangeMax);
    } else {
      this.rangeMin = 0;     
    }
    console.log('Min: ' + this.rangeMin);

    this.rangeValue = stat.value;
    this.calcStep(this.rangeValue);
  }

  rangeChange(stat: CharacterStat) {
    clearInterval(this.timeoutRef);
    this.calcStep(this.rangeValue);
    this.timeoutRef = setInterval(() => {
      this.rangeEnd(stat);
    }, RANGETIMEOUT);
  }

  rangeEnd(stat: CharacterStat) {
    clearInterval(this.timeoutRef);   
    // console.log('RANGE END: ' + this.rangeValue);
    this.store.dispatch(new StatActions.Update({id: stat.id, name: stat.name, value: this.rangeValue, maximum: stat.maximum, type: stat.type}));
    // this.unselectStat();
  }

  removeStat(stat?: CharacterStat) {
    let toRemove;
    if (stat) {
      toRemove = stat.id;
    } else {
      toRemove = this.statId;
    }
    this.store.dispatch(new StatActions.Remove(toRemove));
  }

  updateStat(stat) {
    this.store.dispatch(new StatActions.Update(this.generateStat()));
    this.editStatForm.reset();
  }

  createStat() {
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
  }

  getVis(value: number, maximum: number) {
    if (maximum < 1) {
      return false;
    } else if (value >= maximum) {
      return false;
    } else {
      return true;
    }
  }

  refresh(stat: CharacterStat) {
      this.store.dispatch(new StatActions.Update({
        id: stat.id,
        name: stat.name,
        value: stat.maximum,
        maximum: stat.maximum,
        type: stat.type
      }));
  }

  // trash(stat: CharacterStat) {
  //   this.store.dispatch(new StatActions.Remove(stat.id));
  // }

  ngOnDestroy() {
    this.statSub.unsubscribe();
  }

}
