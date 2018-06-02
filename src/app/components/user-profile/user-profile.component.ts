import { RecipesDataService } from './../../Services/recipesData.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../../Services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Recipe } from './../../models/Recipe';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit 
{
  ngUnsubscribe: Subject<any> = new Subject();

  userProfileImageSource: string;
  selectedRecipeImg: string = "";
  profileUsername: string;
  userDetails: string;
  userName: string;
  userID: string;

  isAuthenticatedUserRecipe: boolean = false;
  isEditingRecipe: boolean = false;
  showRecipeModal: boolean = false;
  theSelectedRecipe: Recipe;
  userRecipes: any[] = [];
  
  constructor(
    private recipeDataService: RecipesDataService, 
    private ngFireDB: AngularFireDatabase,
    private authService: AuthService, 
    private route: ActivatedRoute, 
    private router: Router) 
  { 
    this.getRoutingParameters();
  }

  ngOnInit() 
  { }

  getRoutingParameters()
  {
    this.route.params.subscribe(params => {
      this.profileUsername = params.userName;
      this.getUser();
    });
  }

  getUser()
  {
    let usersList = this.ngFireDB.list<any>('/users', ref => ref.orderByChild('userName').equalTo(this.profileUsername));
    
    return usersList.snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).subscribe(users => {
      return users.map(user => {

        this.userName = user.userName;
        this.userDetails = user.aboutUser;
        this.userProfileImageSource = user.photoUrl;
        this.userID = user.uid;
 
        this.getUserRecipes(this.userID);
      });
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

  setSelected(selectedRecipe: Recipe)
  {
    this.showRecipeModal = true;
    this.theSelectedRecipe = selectedRecipe;
    this.selectedRecipeImg = this.theSelectedRecipe.imagesrc;
  }

  getModalState(event: boolean)
  {
    if(event) {
      this.showRecipeModal = false;
    } 
    else {
      this.showRecipeModal = true;
    }
  }

  ngOnDestroy() 
  {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
