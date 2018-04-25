import { RecipesDataService } from './../../Services/recipesData.service';
import { AuthService } from './../../Services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { AngularFireDatabase , AngularFireList, AngularFireObject } from 'angularfire2/database';
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

  constructor(private formBuilder: FormBuilder, private authService: AuthService, public router:Router,  public ngFireDB: AngularFireDatabase, public recipesDataService: RecipesDataService)
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
      .then( res => { // after logging in

        
        this.authService.getAuth().subscribe(authState => { // get authentication state to get current logged in user
        
          // find the user object in DB that matches with the name of the current logged in user 
          this.recipesDataService.getDbUserByName(authState.displayName).subscribe(users => {
            return users.map(user => {

              if(!user.completedProfile) // and if they still haven't completed their profile
              {
                console.log("User doesn't have a complete profile.");
                //this.router.navigate(['/completeProfile']); // take them to the profile completion page
              } else {
                console.log("User has a complete profile.");
                this.router.navigate(['/allrecipes']); // and if they did, then take them to the recipes page
              }
              
            })
          });


        }) // getAuth END

      }) // .then END
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
        .then( res => { // after registering

          // Create a mock user object using registeration form data

          let userObject = {
            uid: "", 
            userName: this.registerationUsername, 
            email: this.registerationEmail, 
            photoUrl: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
            aboutUser: "",
            completedProfile: false,
            recipesIDs: [""]
          }

          this.recipesDataService.addUser(userObject); // Add the user object to the Database users list
          this.swapFormBoolean = false; // show the login form (false->login, true->registeration)
        })
        .catch( err => {
          window.alert(err.message);
        });
    }

    
    /* // Not needed here but will be used to update the completedProfile to true after the submission of completeProfile form, keep it until then.
      this.recipesDataService.findUserWithName(authState.displayName).map(user => {
        userObject.update(user.key, {
        uid: user.uid,
        userName: user.userName,
        email: user.email,
        photoUrl: user.photoUrl,
        completedProfile: true, 
        recipesIDs: user.recipesIDs
        });
      });
    */ 
  }

}
