import { AngularFireDatabase , AngularFireList, AngularFireObject } from 'angularfire2/database';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { FlashMessagesService, FlashMessagesModule } from 'angular2-flash-messages';
import { RecipesDataService } from './../../Services/recipesData.service';
import { matchOtherValidator } from './../../models/matchOtherValidator';
import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit 
{
  registerationFormGroup: FormGroup;
  loginFormGroup: FormGroup;

  swapFormBoolean: boolean = false; 
  registerClick: boolean = false;
  loginClick: boolean = false;

  registerationUsername: string;
  registerationPassword: string;
  registerationEmail: string;
  loginPassword: string;
  loginEmail: string;

  constructor(
    private recipesDataService: RecipesDataService,
    private ngFireDB: AngularFireDatabase, 
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router:Router,  
    )
  { 
    this.buildForms();
  }

  ngOnInit() {}

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

        this.authService.getAuth().subscribe(authState => { 
        
          // find the user object in DB that matches with the name of the current logged in user 
          this.recipesDataService.getDbUserByName(authState.displayName).subscribe(users => {
            return users.map(user => {

              if(!user.completedProfile)
              {
                console.log("User doesn't have a complete profile.");
                this.router.navigate(['/completeProfile']); 
              } else {
                console.log("User: " + user.userName + " has a complete profile.");
                this.router.navigate(['/allrecipes']); 
              }
              
            })
          });
        }) 
      }) 
      .catch( err => {
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

        let userObject = {
          uid: "", 
          userName: this.registerationUsername, 
          email: this.registerationEmail, 
          photoUrl: "https://i.imgur.com/g2Ju9YJ.png",
          aboutUser: "",
          completedProfile: false,
          recipesIDs: [""],
          recipesCount: 0
        }

        this.recipesDataService.addUser(userObject); // Add the user object to the Database users list
        this.swapFormBoolean = false; // show the login form (false->login, true->registeration)
      })
      .catch( err => {
        window.alert(err.message);
      });
    }
  }

}