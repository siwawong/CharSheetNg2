import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css']
})
export class AddCharacterComponent implements OnInit {
  charName: FormControl;
  addCharForm: FormGroup;

  constructor(private router: Router) {
    this.charName = new FormControl(Validators.required);

    this.addCharForm = new FormGroup({
      name: this.charName
    });
  }

  ngOnInit() {
  }

}
