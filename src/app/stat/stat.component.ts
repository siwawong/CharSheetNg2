import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { CharacterStat } from '../character-stat';

@Component({
  selector: 'app-stat',
  templateUrl: 'stat.component.html',
  styleUrls: ['stat.component.css']
})
export class StatComponent implements OnInit {

  @Input()  stat: CharacterStat;
  @Output() statUpdated = new EventEmitter();
  editing:  boolean = false;
  statForm: FormGroup;
  value:    FormControl;
  maximum:      FormControl;


  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.value = new FormControl(this.stat.value);
    this.maximum = new FormControl(this.stat.maximum);

    this.statForm = this.formBuilder.group({
      value:  this.value,
      max:    this.maximum
    });
  }

  // updates need to be separated if doing the ng Store approach
  FinishEdit() {
    this.editing = false;
    // always output a new object
    // TODO: remove this assignment - allow Observable updates to flow in and make updates
    this.stat = Object.assign({}, this.stat, {value: this.value.value, maximum: this.maximum.value});
    this.statUpdated.next(this.stat);
  }
}
