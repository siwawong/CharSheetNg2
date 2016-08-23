import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


export interface Stat {
  name:   string;
  value:  number;
  max:    number;
  type:   string;
}

@Component({
  selector: 'app-stat',
  templateUrl: 'stat.component.html',
  styleUrls: ['stat.component.css']
})
export class StatComponent implements OnInit {

  @Input()  stat: Stat;
  @Output() statUpdated = new EventEmitter();
  editing:  boolean = false;
  statForm: FormGroup;
  value:    FormControl;
  max:      FormControl;


  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.value = new FormControl(this.stat.value);
    this.max = new FormControl(this.stat.max);

    this.statForm = this.formBuilder.group({
      value:  this.value,
      max:    this.max
    })
  }
  // updates need to be separated if doing the ng Store approach. Which I think I do want to do
  FinishEdit() {
    this.editing = false;
    // // TODO: add step to check for any change
    // // could use form 'dirty' attr
    // // always output a new object
    this.statUpdated.next(Object.assign({}, this.stat, 
      {value: this.value.value, max: this.max.value}));
  }
}
