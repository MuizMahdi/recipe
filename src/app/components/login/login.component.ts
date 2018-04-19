import { AuthService } from './../../Services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { matchOtherValidator } from './../../models/matchOtherValidator';
import { FlashMessagesService, FlashMessagesModule } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit 
{

  loginFormGroup: FormGroup;
  registerationFormGroup: FormGroup;

  swapFormBoolean: boolean = false; 
  loginClick: boolean = false;
  registerClick: boolean = false;

  loginEmail: string;
  loginPassword: string;

  registerationUsername: string;
  registerationEmail: string;
  registerationPassword: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, public router:Router, public flashMessage: FlashMessagesModule)
  { 
    this.buildForms();
  }

  ngOnInit()
  {

  }

  buildForms()
  {
    this.loginFormGroup = new FormGroup({
      emailCtrl: new FormControl(null, [Validators.required]),
      passwordCtrl: new FormControl(null, [Validators.required])
    });

    this.registerationFormGroup = new FormGroup({
      nameCtrl: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      emailCtrl: new FormControl(null, [Validators.required]),
      passwordCtrl: new FormControl(null, [Validators.required]),
      confirmPasswordCtrl: new FormControl(null, [Validators.required, matchOtherValidator('passwordCtrl')])
    }); 
  }

  onLogin()
  {
    this.loginClick = true;
    
    this.loginEmail = this.loginFormGroup.get('emailCtrl').value;
    this.loginPassword = this.loginFormGroup.get('passwordCtrl').value;

    if(this.loginFormGroup.valid)
    {
      this.authService.login(this.loginEmail, this.loginPassword)
      .then( res => {
        //this.flashMessage.show('You are logged in', {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/allrecipes']);
      })
      .catch( err => {
        //this.flashMessage.show(err.message, {cssClass: 'alert-danger', timeout: 4000});
        console.log(err.message);
      });
    }
  }


  onRegister()
  {
    this.registerClick = true;

    this.registerationUsername = this.registerationFormGroup.get('nameCtrl').value;
    this.registerationEmail = this.registerationFormGroup.get('emailCtrl').value;
    this.registerationPassword = this.registerationFormGroup.get('passwordCtrl').value;

    if(this.registerationFormGroup.valid)
    {
      this.authService.register(this.registerationUsername, this.registerationEmail, this.registerationPassword)
        .then( res => {
          window.alert("You are now registered");
          this.router.navigate(['/login']);
        })
        .catch( err => {
          window.alert(err.message);
        });
    }
  }

}
