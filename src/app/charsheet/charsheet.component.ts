import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs/Rx';

import { StatComponent, Stat } from '../stat'

@Component({
  moduleId: module.id,
  selector: 'app-charsheet',
  templateUrl: 'charsheet.component.html',
  directives: [StatComponent],
  styleUrls: ['charsheet.component.css'],
})
export class CharsheetComponent implements OnInit {
  idSubscription: Subscription;
  name: string;
  stats: Observable<Array<Stat>>;
  
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.idSubscription = this.activatedRoute.params.subscribe(params => {
      this.name = params['name']
    });
        // for now using a dummy list    
    let dummyStats:Array<Stat> = [
      {name: 'shield', value: 100, maximum: 100, type: 'health'},
      {name: 'sword', value: 100, maximum: 100, type: 'weapon'}
    ];

    this.stats = Observable.create(observer => {
      observer.next(dummyStats);
    });
  }
  
  ngOnDestroy() {
    this.idSubscription.unsubscribe();
  }

}
