import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface Stat {
  name:string;
  value:number;
  maximum:number;
  type:string;
}

@Component({
  selector: 'app-stat',
  templateUrl: 'stat.component.html',
  styleUrls: ['stat.component.css']
})
export class StatComponent implements OnInit {

  @Input() stat: Stat;
  @Output() statUpdated = new EventEmitter();
  editing: boolean = false;

  constructor() {}

  ngOnInit() {
  }
  // updates need to be separated if doing the ng Store approach. Which I think I do want to do
  FinishEdit() {
    this.editing = false;
    // TODO: add step to check for any change
    // could use form 'dirty' attribute

    // always output a new object
    this.statUpdated.next(Object.assign({}, this.stat))
  }
}
