import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'app-charsheet',
  templateUrl: 'charsheet.component.html',
  styleUrls: ['charsheet.component.css'],
})
export class CharsheetComponent implements OnInit {
  idSubscription: Subscription;
  name: string;
  
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.idSubscription = this.activatedRoute.params.subscribe(params => {
      this.name = params['name']; 
    })
  }
  
  ngOnDestroy() {
    this.idSubscription.unsubscribe();
  }

}
