import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { style, state, animate, trigger, transition } from '@angular/animations';

import { IonicPage } from 'ionic-angular';

import { Store } from '@ngrx/store';

import { CharacterStat } from '../../app/models/stat-model';
import { Character } from '../../app/models/character-model';
import { StatComponent } from '../../components/stat/stat';

import * as fromRoot from '../../app/store/reducers';
import * as StatActions from '../../app/store/actions/stat-actions';
import * as NavActions from '../../app/store/actions/nav-actions';

const RANGETIMEOUT = 1250;
const EVENTDEBOUNCE = RANGETIMEOUT / 4;

@IonicPage()
@Component({
  selector: 'page-character-sheet',
  templateUrl: 'character-sheet.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('charTitle', [
      state('in',
        style({
          transform: 'rotateX(0)'
      })),
      transition('void => *', [
        style({
          transform: 'rotateX(-145deg)'
        }),
        animate(150)
      ])
    ]),
    trigger('statTitle', [
      state('in',
        style({
          transform: 'rotateX(0)'
      })),
      transition('void => *', [
        style({
          transform: 'rotateX(-145deg)'
        }),
        animate(150)
      ])
    ]),
    trigger('activeRangeHeight', [
      state('in', style({
        height: '*',
        overflow: 'hidden'
      })),
      transition('void => *', [
        style({
          height: '0px',
          overflow: 'hidden'
        }),
        animate(250)
      ])
    ])
  ]
})
export class CharacterSheetPage {
  private character: Observable<Character>;
  private stats: Observable<CharacterStat[]>;
  private currentStat: Observable<CharacterStat>;

  private timeoutRef;
  private rangeValue: number;
  private rangeMax: number;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.character = this.store.select(fromRoot.getCharacter);
    this.stats = this.store.select(fromRoot.getStats);
    this.currentStat = this.store.select(fromRoot.getStat);
  }

  unselectStat() {
    this.store.dispatch(new StatActions.Unselect());
  }

  calcRange(stat: CharacterStat) {
    this.rangeMax = stat.maximum;
    this.rangeValue = stat.value;
  }

  rangeChange(stat: CharacterStat) {
    clearInterval(this.timeoutRef);
    // this.formValue.setValue(this.rangeValue);
    this.timeoutRef = setInterval(() => {
      this.rangeEnd(stat);
    }, RANGETIMEOUT);
  }

  rangeEnd(stat: CharacterStat) {
    clearInterval(this.timeoutRef);
    const newStat =  {id: stat.id, name: stat.name, value: this.rangeValue, maximum: stat.maximum, type: stat.type};
    // console.log(`End ${JSON.stringify(newStat)}`); 
    this.store.dispatch(new StatActions.Update(newStat));
    // this.formValue.setValue('');
  }
  
  rangeClick(stat: CharacterStat, type: string) {
    // console.log(`click ${JSON.stringify(stat)}`);
    if (type === 'PLUS') {
      this.rangeValue += 1;      
    } else {
      this.rangeValue -= 1;      
    }
    this.rangeChange(stat);    
  }

  createStat() {
    this.store.dispatch(new NavActions.CreateStat());
  }

  editStat() {
    this.store.dispatch(new NavActions.CreateStat('EDITMODE'));
  }
}
