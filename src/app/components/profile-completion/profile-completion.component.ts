import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipesDataService } from './../../Services/recipesData.service';
import { AuthService } from './../../Services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { AngularFireDatabase , AngularFireList, AngularFireObject } from 'angularfire2/database';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile-completion',
  templateUrl: './profile-completion.component.html',
  styleUrls: ['./profile-completion.component.css']
})


export class ProfileCompletionComponent implements OnInit 
{

  profileCompletionFormGroup: FormGroup;
  authSubscription: ISubscription;
  getDbListSubscription: ISubscription;
  photoUrl: string = "";
  aboutUser: string;
  invalidImageUrl: boolean = false;
  submitClicked:boolean = false;


  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private recipesDataService: RecipesDataService, 
    private ngFireDB: AngularFireDatabase, 
    private router: Router) 
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
    //this.photoUrl = this.profileCompletionFormGroup.get('photoUrlCtrl').value; // Used ngModel instead for real-time image validation check
    this.submitClicked = true;
    this.aboutUser = this.profileCompletionFormGroup.get('aboutUserCtrl').value;
    
    this.authSubscription = this.authService.getAuth().subscribe(authState => {
      let usersList = this.ngFireDB.list<any>('/users', ref => ref.orderByChild('userName').equalTo(authState.displayName));

      this.getDbListSubscription = this.recipesDataService.getDbListObject(usersList).subscribe(users => {
        return users.map(user => {

          if(this.invalidImageUrl)
          {
            this.photoUrl = user.photoUrl;
          }

          console.log(user.photoUrl);
          
          usersList.update(user.key, {
          uid: authState.uid, 
          userName: user.userName, 
          email: user.email, 
          photoUrl: this.photoUrl,
          aboutUser: this.aboutUser,
          completedProfile: true,
          recipesIDs: [""]
          })

          this.router.navigate(['/myrecipes']);
        });
      });
    });
    
  }

  onValidProfileImageUrl()
  {
    this.invalidImageUrl = false;
  }

  onInvalidProfileImageUrl()
  {
    this.invalidImageUrl = true;
  }

  ngOnDestroy()
  {
    this.unSubscribeAll();
  }

  unSubscribeAll()
  {
    if(typeof this.authSubscription != 'undefined') {
      this.authSubscription.unsubscribe();
    }
    else if (typeof this.getDbListSubscription != 'undefined') {
      this.getDbListSubscription.unsubscribe();
    }
  }


}
