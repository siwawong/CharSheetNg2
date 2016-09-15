import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs/Rx';

import { CharacterStatsService } from '../character-stats.service';
import { CharacterStat } from '../character-stat'
import { StatComponent } from '../stat';

@Component({
  selector: 'app-charsheet',
  templateUrl: 'charsheet.component.html',
  directives: [StatComponent],
  styleUrls: ['charsheet.component.css'],
})
export class CharsheetComponent implements OnInit {
  idSubscription: Subscription;
  name: string;
  stats: Observable<CharacterStat[]>;
  
  constructor(private activatedRoute: ActivatedRoute, private characterStats: CharacterStatsService) {}

  ngOnInit() {
    this.idSubscription = this.activatedRoute.params.subscribe(params => {
      this.name = params['user']; // switch to name at some point
      this.stats = this.characterStats.getCharacterStats(this.name);
    });
  }
  
  updateStat(newStat: CharacterStat) {
    // TODO: update store with new stat
    // do 'ADD_STAT' action
    // console.log(newStat);
  }

  ngOnDestroy() {
    this.idSubscription.unsubscribe();
  }

}
