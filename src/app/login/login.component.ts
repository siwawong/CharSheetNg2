import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { LoginService } from '../login.service'

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [LoginService, FormBuilder]
})
export class LoginComponent implements OnInit {
  
   username: FormControl;
   password: FormControl;
   loginForm: FormGroup;

   defaultName: string = "";
   defaultPassword: string = "No Password Required";
   defaultSuggested: string = "Enter Your Username";

   validUserName: string;
   suggestedUsername: string = this.defaultSuggested;
    
  constructor(private router:Router, private loginService:LoginService, fb:FormBuilder) {
      this.username = new FormControl(this.defaultName, Validators.required);
      this.password = new FormControl(this.defaultPassword);

      this.loginForm = new FormGroup({
        username: this.username,
        password: this.password
      })
  }

  reset(usernameString: string) {
    this.username.setValue(this.defaultName);
    this.password.setValue(this.defaultPassword);
    this.suggestedUsername = usernameString;
  }

  login() {
    // on result, if good go to character list, on fail notify
    if (this.username.pristine) {
      this.reset("Please Enter A Username");
    }
    else {
      this.loginService.getUserName(this.username.value).subscribe( username => {
        if (username !== undefined) {
          this.router.navigateByUrl(username);
        } else {
          // error - this could be an observable error instead of a static string?
          this.reset("Invalid Username");
        }
      });
    }
  }

  ngOnInit() {
  }
}
