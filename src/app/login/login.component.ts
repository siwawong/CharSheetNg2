import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgForm, Control, ControlGroup, Validators } from '@angular/common'

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  username: Control = new Control('', Validators.required);
  pw: Control = new Control('', Validators.required);
  userInfo: ControlGroup = new ControlGroup({'username': this.username,
                                             'pw': this.pw})
  
  constructor(private router:Router) {}

  login() {
    // TODO: subscribe to observable
    // on result, if good go to character list, on fail notify and clear fields
    
    // for now: just go to character sheet
    this.router.navigateByUrl('characterSelect')
  }

  ngOnInit() {
  }

}
