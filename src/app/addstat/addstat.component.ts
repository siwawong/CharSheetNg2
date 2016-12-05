import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router }    from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { CharacterStatsService } from '../character-stats.service';

@Component({
  selector: 'app-addstat',
  templateUrl: 'addstat.component.html',
  styleUrls: ['addstat.component.css']
})
export class AddstatComponent implements OnInit {
  private charName: string;
  private user: string;
  private name: FormControl;
  private value: FormControl;
  private max: FormControl;
  private type: FormControl;

  constructor(private activatedRoute: ActivatedRoute, 
              private statService: CharacterStatsService,
              private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {


    this.activatedRoute.params.subscribe(params => {
      this.charName = params['name'];
      this.user =     params['user'];
    });
  }

  submit() {
    
  }

}
