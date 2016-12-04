import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { Subscription } from 'rxjs/Subscription';

import { CharacterListService } from '../character-list.service';
import { LoginService }         from '../login.service';

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css']
})
export class AddCharacterComponent implements OnInit {
  charName: FormControl = new FormControl('', Validators.required);
  addCharForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              private router: Router, 
              private characterListService: CharacterListService,
              private loginService: LoginService) {
  }

  ngOnInit() {
    this.addCharForm = this.formBuilder.group({
      name: this.charName
    });
  }

  addCharacter() {
    this.characterListService.addCharacter(this.charName.value);
    this.router.navigate([this.loginService.currentUserUrl()]);
  }
}
