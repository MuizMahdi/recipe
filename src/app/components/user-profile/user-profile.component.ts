import { Subject } from 'rxjs/Subject';
import { Recipe } from './../../models/Recipe';
import { AngularFireDatabase } from 'angularfire2/database';
import { RecipesDataService } from './../../Services/recipesData.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit 
{

  profileUsername: string;
  userName: string;
  userDetails: string;
  userProfileImageSource: string;
  userID: string;
  userRecipes: any[] = [];

  theSelectedDaRecipe: Recipe;

  ngUnsubscribe: Subject<any> = new Subject();

  constructor(private route: ActivatedRoute, private router: Router, private recipeDataService: RecipesDataService, private ngFireDB: AngularFireDatabase) 
  { 
    this.getRoutingParameters();
  }

  getRoutingParameters()
  {
    this.route.params.subscribe(params => {
      this.profileUsername = params.userName;
      this.getUser();
    });
  }


  getUser()
  {
    this.recipeDataService.getDbUserByName(this.profileUsername).takeUntil(this.ngUnsubscribe).subscribe(users => {
      return users.map(user => {

        this.userName = user.userName;
        this.userDetails = user.aboutUser;
        this.userProfileImageSource = user.photoUrl;
        this.userID = user.uid;

        this.getUserRecipes(this.userID);
      })
    });
  }

  
  getUserRecipes(uid: any)
  {
    let recipesList = this.ngFireDB.list<any>('/recipes', ref => ref.orderByChild('RID').equalTo(uid));

    return recipesList.snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).takeUntil(this.ngUnsubscribe).subscribe(recipes => {
      this.userRecipes = recipes;
    });
  }


  setSelected2(selectedDaRecipe: Recipe)
  {
    this.theSelectedDaRecipe = selectedDaRecipe;
  }


  ngOnInit() 
  { }

  ngOnDestroy() 
  {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
