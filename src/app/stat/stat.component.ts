import { Component, OnInit, Input } from '@angular/core';

export interface Stat {
  name:string;
  value:number;
  maximum:number;
  type:string;
}

@Component({
  moduleId: module.id,
  selector: 'app-stat',
  templateUrl: 'stat.component.html',
  styleUrls: ['stat.component.css']
})
export class StatComponent implements OnInit {

  @Input() stat: Stat;

  constructor() {}

  ngOnInit() {
  }

}
