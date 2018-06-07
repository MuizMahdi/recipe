import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { RecipesDataService } from './../../Services/recipesData.service';
import { RecipesComponent } from './../recipes/recipes.component';
import { an_Ingredient } from './../../models/an_Ingredient';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './../../Services/auth.service';
import { SimpleChanges, OnChanges } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { Comment } from './../../models/Comment';
import { Recipe } from './../../models/Recipe';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit, OnChanges
{
/*******************************************************************************************/
  @Input() aSelectedRecipe: Recipe;

  changeDetect: Recipe;

  recipeName: string;
  recipeMaker: string;
  recipeImageSource: string;
  recipeDescription: string;
  recipeIngredients: string[];
  recipeComments: Comment[];
  recipeUpvotes: number;
  recipeUpvoted: boolean;

  makerPhoto: string = "";

  commentFormInput: string;
  latestComments: Comment[];
  lotsOfComments: boolean = false;
  numberOfComments: number;
  recipeComments_Slice: Comment[];
  commentingProfileImage: string = "";

  canUpvote: boolean = true;
  formValid: boolean = true;

  theRecipe: Recipe[];

  authUnsubscribe: Subject<any> = new Subject();
  notificationSubscription: ISubscription;
  recipesDataSubscription: ISubscription;
  unUpvoteSubscription: ISubscription;
  commentSubscription: ISubscription;
  upvoteSubscription: ISubscription;
  authSubscription: ISubscription;

  mockRecipeComments: string[] = [];  
  makerNotifications:string[] = [];
  mockUpvoters: string[] = [""];
  mockComments: string[] = [""];

  authenticatedUserName: string;
/*******************************************************************************************/
/*******************************************************************************************/

  constructor( 
    public recipesDataService: RecipesDataService, 
    private authService: AuthService, 
    private ngFireDB: AngularFireDatabase)
  {  
    this.latestComments = [];
  }

  ngOnInit()
  {
    this.getAuthenticatedUserName();
  }

  getAuthenticatedUserName()
  {
    this.authSubscription = this.authService.getAuth().subscribe(authState=> {
      this.authenticatedUserName = authState.displayName.slice(0);
    });
  }

  ngOnChanges(changes: SimpleChanges) 
  {
    for (let propName in changes) 
    {
      let chng = changes[propName];
      this.changeDetect = chng.currentValue;
    }

    this.unSubscribeAll();
    
    this.recipeName = this.changeDetect.name;
    this.recipeImageSource = this.changeDetect.imagesrc;
    this.recipeDescription = this.changeDetect.description;
    this.recipeUpvotes = this.changeDetect.upvotes;
    this.recipeUpvoted = this.changeDetect.upvoted;
    this.recipeIngredients = this.changeDetect.recipeIngredients;
    this.recipeComments = this.changeDetect.comments;
    this.recipeMaker = this.changeDetect.makerName;

    this.recipeComments_Slice = this.recipeComments.slice();

    this.numberOfComments = this.recipeComments.length;

    this.lotsOfComments = false;
    
    if(this.recipeComments[0].comment === "")
    {
      this.numberOfComments = (this.recipeComments.length - 1);
      this.recipeComments = [];
    }
   
    if(this.recipeComments.length > 2)
    {
      for(let i=0; i<3; i++)
      {
        this.latestComments[i] = this.recipeComments_Slice[i];
      }

      this.lotsOfComments = true;
    }

    this.getRecipeMakerPhoto();
    this.checkUserUpvoteState();
  }

  getRecipeMakerPhoto()
  {
    this.recipesDataService.getDbUserByName(this.recipeMaker).subscribe(users => {
      return users.map(user => {
        this.makerPhoto = user.photoUrl;
      })
    })
  }

  checkUserUpvoteState()
  {
    this.unSubscribeAll();

    this.authSubscription = this.authService.getAuth().subscribe(authState => {

      this.recipesDataService.getDbUserByName(authState.displayName).subscribe(users => {
        return users.map(user => {
          this.commentingProfileImage = user.photoUrl;
        });
      });

      this.recipesDataService.getDbRecipeByName(this.aSelectedRecipe.name).takeUntil(this.authUnsubscribe).subscribe(recipes => {
        return recipes.map(recipe => {

          this.canUpvote = true;

          for(let i=0; i<recipe.upvoters.length; i++)
          {
            if(recipe.upvoters[i] === authState.displayName)
            {
              this.canUpvote = false;
            }
          }

        });
      });
    });

  }

  onShowMoreComments()
  {
    this.lotsOfComments = false;
  }

  onUpvote()
  {
    if(this.canUpvote)
    {
      this.recipeUpvotes = this.recipeUpvotes + 1; 
      this.canUpvote = false; 
      this.upvoteRecipe(this.aSelectedRecipe);
    }
    else
    {
      console.log("wtf..");
    }
  }

  onUnUpvote()
  {
    if(!this.canUpvote)
    {
      this.recipeUpvotes = this.recipeUpvotes - 1; 
      this.canUpvote = true; 
      this.unUpvoteRecipe(this.aSelectedRecipe);
    }
    else
    {
      console.log("wtf..");
    }
  }

  upvoteRecipe(recipe: any)
  {
    this.unSubscribeAll();

    let recipeList = this.ngFireDB.list<any>('/recipes', ref => ref.orderByChild('name').equalTo(recipe.name));

    this.upvoteSubscription = this.recipesDataService.getDbListObject(recipeList).subscribe(recipes => {

      this.mockUpvoters = recipes[0].upvoters.slice();
      this.mockUpvoters.push(this.authenticatedUserName);
        
      recipeList.update(recipes[0].key, {upvotes:(recipes[0].upvotes+1), upvoters: this.mockUpvoters});

      let recipeMaker:string = recipes[0].makerName;
      let upvoter:string = this.authenticatedUserName;
      let recipeName:string = recipes[0].name;

      this.notifyMaker(recipeMaker, upvoter, recipeName, "upvote");
    });
  }
  
  notifyMaker(recipeMaker:string, notifier:string, recipeName:string, notificationType:string)
  {
    this.unSubscribeAll();

    if(recipeMaker != notifier)
    {
      let usersList = this.ngFireDB.list<any>('/users', ref => ref.orderByChild('userName').equalTo(recipeMaker));

      this.notificationSubscription = this.recipesDataService.getDbListObject(usersList).subscribe(users => {

        let mockNotification:string;

        if(notificationType === "upvote") { 
          mockNotification = (notifier + " has upvoted your " + recipeName + " recipe");
        }
        else if(notificationType === "comment") {
          mockNotification = (notifier + " has commented in your " + recipeName + " recipe");
        }
 
        this.makerNotifications = users[0].notifications.slice();
        this.makerNotifications.unshift(mockNotification);

        usersList.update(users[0].key, {notifications: this.makerNotifications});

        this.changeMakerNotificationState(recipeMaker);

      });
    }
  }

  NotificationStateSubscription: ISubscription;
  changeMakerNotificationState(recipeMaker: string)
  {
    this.unSubscribeAll();
    //this.recipesDataService.setUserNotificationState(recipeMaker, true);
    let usersList = this.ngFireDB.list<any>('/users', ref => ref.orderByChild('userName').equalTo(recipeMaker));

    this.NotificationStateSubscription = this.recipesDataService.getDbListObject(usersList).subscribe(users => {
      usersList.update(users[0].key, {notificationState: true});
    });
  }

  unUpvoteRecipe(recipe: any)
  {
    this.unSubscribeAll();

    let recipeList = this.ngFireDB.list<any>('/recipes', ref => ref.orderByChild('name').equalTo(recipe.name));
  
    this.unUpvoteSubscription = this.recipesDataService.getDbListObject(recipeList).subscribe(recipes => {

      this.mockUpvoters = this.deleteUpvoter(recipes[0].upvoters.slice(), this.authenticatedUserName).slice();

      recipeList.update(recipes[0].key, {upvotes:(recipes[0].upvotes-1), upvoters: this.mockUpvoters});
    });
  }
  
  deleteUpvoter(array:string[], upvoter:string)
  {
    let index = array.indexOf(upvoter);

    if(index == array.length-1)
    {
      return array.splice(0, index);
    }

    let temp1:string[] = array.slice().splice(0, index);
    let temp2:string[] = array.slice().splice(index+1, array.length-1);

    return temp1.concat(temp2);
  }

  addComment({value, valid})
  {

    this.unSubscribeAll();
    
    if(valid)
    {
      this.formValid = true;
      this.numberOfComments++;

      this.recipesDataSubscription = this.recipesDataService.getDbUserByName(this.authenticatedUserName).subscribe(users => {
        return users.map(user => {

          let mockComment:Comment = {
            comment: this.commentFormInput,
            commenter: this.authenticatedUserName,
            commenterPhotoURL: user.photoUrl
          }

          this.recipeComments.unshift(mockComment);

          let upvoter:string = this.authenticatedUserName;

          this.updateRecipeComments(upvoter);

          this.commentFormInput = null;
        });
      });

      this.checkLatestComments();

    }
    else
    {
      this.formValid = false;
    }

  }

  updateRecipeComments(upvoter:string)
  {
    this.unSubscribeAll();
    let recipeList = this.ngFireDB.list<any>('/recipes', ref => ref.orderByChild('name').equalTo(this.aSelectedRecipe.name));

    this.commentSubscription = this.recipesDataService.getDbListObject(recipeList).subscribe(recipes => {
      recipeList.update(recipes[0].key, {comments: this.recipeComments});

      let recipeMaker:string = recipes[0].makerName;
      let recipeName:string = recipes[0].name;

      this.notifyMaker(recipeMaker, upvoter, recipeName, "comment");
    });
  }

  checkLatestComments()
  {
    // add the added comment to the latest 3 comments
    if(this.recipeComments.length > 2)
    {
      this.recipeComments_Slice = this.recipeComments.slice();

      for(let i=0; i<3; i++)
      {
        this.latestComments[i] = this.recipeComments_Slice[i];
      }

      this.lotsOfComments = true;
    }
    else 
    {
      this.lotsOfComments = false;
    }
  }

  onShowRecipeDetails()
  {
    document.getElementById("recipeName").scrollIntoView({ block: 'end',  behavior: 'smooth' });
  }

  unSubscribeAll()
  {
    if(typeof this.commentSubscription !== 'undefined') {
      this.commentSubscription.unsubscribe();
    }
    if(typeof this.upvoteSubscription !== 'undefined') {
      this.upvoteSubscription.unsubscribe();
    }
    if(typeof this.unUpvoteSubscription !== 'undefined') {
      this.unUpvoteSubscription.unsubscribe();
    }
    if(typeof this.notificationSubscription !== 'undefined') {
      this.notificationSubscription.unsubscribe();
    }
    if(typeof this.authSubscription !== 'undefined') {
      this.authSubscription.unsubscribe();
    }
    if(typeof this.recipesDataSubscription !== 'undefined') {
      this.recipesDataSubscription.unsubscribe();
    }
    if(typeof this.NotificationStateSubscription !== 'undefined') {
      this.NotificationStateSubscription.unsubscribe();
    }
  }

  ngOnDestroy()
  {
    this.unSubscribeAll();
  }

/*******************************************************************************************/
}