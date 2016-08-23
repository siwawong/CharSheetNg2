import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs/Rx';

import { StatComponent, Stat } from '../stat'

@Component({
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
      {name: 'shield', value: 70, max: 100, type: 'health'},
      {name: 'sword', value: 60, max: 100, type: 'weapon'}
    ];

    this.stats = Observable.create(observer => {
      // emit dummy data
      // this will be fetched from an http request eventually
      observer.next(dummyStats);
    });
  }
  
  updateStat(newStat: Stat) {
    // TODO: update store with new stat
    console.log(newStat);
  }

  ngOnDestroy() {
    this.idSubscription.unsubscribe();
  }

}
