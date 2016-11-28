import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs/Rx';

import { CharacterListService }  from '../character-list.service';
import { CharacterStatsService } from '../character-stats.service';
import { CharacterStat } from '../models/character-stat'
import { StatComponent } from '../stat';

@Component({
  selector: 'app-charsheet',
  templateUrl: 'charsheet.component.html',
  styleUrls: ['charsheet.component.css'],
})
export class CharsheetComponent implements OnInit {
  idSubscription: Subscription;
  name: string;
  stats: Observable<CharacterStat[]>;
  
  constructor(private activatedRoute: ActivatedRoute,
              private characterListService: CharacterListService, 
              private characterStats: CharacterStatsService) {}

  ngOnInit() {
    this.idSubscription = this.activatedRoute.params.subscribe(params => {
      this.name = params['name']; // switch to name at some point
      this.characterListService.validateCurrentCharacter(this.name);
      this.stats = this.characterStats.getCurrentCharacterStats();
    });
  }
  
  updateStat(newStat: CharacterStat) {
    this.characterStats.updateStat(this.name, newStat);
  }

  ngOnDestroy() {
    this.idSubscription.unsubscribe();
  }
}
