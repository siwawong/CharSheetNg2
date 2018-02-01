import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { CharacterStat } from '../../app/models/stat-model';
import * as fromRoot from '../../app/store/reducers';
import * as StatActions from '../../app/store/actions/stat-actions';
// import { CharacterSheet } from '../../app/store/actions/nav-actions';

@Component({
  selector: 'stat-form-change',
  templateUrl: 'stat-form-change.html'
})
export class StatFormChangeComponent {
  @Input() stat: CharacterStat;
  // @Input() index: number;
  @ViewChild('inputFocus') inputFoc: ElementRef;
  // private stat: Observable<CharacterStat>;

  private editStatForm: FormGroup;
  private formValue: FormControl; 

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    // this.stat = this.store.select(fromRoot.getStat);
    this.formValue = new FormControl('', Validators.required);

    this.editStatForm = new FormGroup({
      value: this.formValue
    });
  }

  ngAfterViewInit() {
    this.inputFoc.nativeElement.focus();
  }

  formChange(stat: CharacterStat, type: string, evt: Event) {
    evt.preventDefault();
    let newValue;
    let subNum = this.editStatForm.get('value').value;

    if (type === 'PLUS') {
      newValue = stat.value + subNum;      
    } else {
      newValue = stat.value - subNum;
    }

    // If a maximum has been set, we also have a minimum of zero. Get the value in bounded
    if (stat.maximum > 0 ) {
      newValue = (newValue < stat.maximum) ? newValue : stat.maximum;
      newValue = (newValue > 0) ? newValue : 0;
    }    

    this.store.dispatch(new StatActions.Update({id: stat.id, name: stat.name, value: newValue, maximum: stat.maximum, type: stat.type}));    
    this.formValue.setValue('');
  }

}
