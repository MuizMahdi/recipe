import { Component, OnInit } from '@angular/core';
import { RecipesDataService } from './../../Services/recipesData.service';
import { AuthService } from './../../Services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { AngularFireDatabase , AngularFireList, AngularFireObject } from 'angularfire2/database';

@Component({
  selector: 'app-profile-completion',
  templateUrl: './profile-completion.component.html',
  styleUrls: ['./profile-completion.component.css']
})


export class ProfileCompletionComponent implements OnInit 
{

  profileCompletionFormGroup: FormGroup;
  photoUrlCtrl: string; // Change it to uploading image later.
  aboutUserCtrl: string;


  constructor(private formBuilder: FormBuilder) 
  { 
    this.buildForm();
  }

  ngOnInit() { }


  buildForm()
  {
    this.profileCompletionFormGroup = new FormGroup({
      photoUrlCtrl: new FormControl(null, []),
      aboutUserCtrl: new FormControl(null,[Validators.required])
    });
  }

  onSubmit()
  {
    /* 
    // Will be used to update the completedProfile to true after the submission of completeProfile form.
    
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
