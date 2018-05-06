import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './../../Services/auth.service';
import { Recipe } from './../../models/Recipe';
import { RecipesDataService } from './../../Services/recipesData.service';
import { an_Ingredient } from './../../models/an_Ingredient';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ARecipe } from '../../models/ARecipe';
import { DataService } from '../../Services/data.service';
import { Observable } from 'rxjs/Observable';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import 'rxjs/add/operator/takeUntil';

import { ISubscription } from "rxjs/Subscription";

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

  private authSubscription: ISubscription;
  private recipeSubscription: ISubscription;
  private unsubscribe = new Subject<void>();

  recipeName: string;
  recipeMaker: string;
  recipeImageSource: string;
  recipeDescription: string;
  recipeIngredients: string[];
  recipeComments: string[];
  recipeUpvotes: number;
  recipeUpvoted: boolean;

  imageSource: string = "../../../assets/ArrowUp_Gray.jpg";

  commentFormInput: string;
  latestComments: string[];
  lotsOfComments: boolean = false;
  numberOfComments: number;
  recipeComments_Slice: string[];

  canUpvote: boolean = true;
  formValid: boolean = true;

  theRecipe: Recipe[];
  private commentUnsubscribe: Subject<any> = new Subject();
  private upvoteUnsubscribe: Subject<any> = new Subject();
  private authUnsubscribe: Subject<any> = new Subject();

  commentingProfileImage: string;
/*******************************************************************************************/


/*******************************************************************************************/

  constructor(public dataService: DataService, 
    public recipesDataService: RecipesDataService, 
    private authService: AuthService, 
    private ngFireDB: AngularFireDatabase)
  { 
    this.latestComments = [];
  }

  ngOnInit()
  {  }

/*******************************************************************************************/

  mockRecipeComments: string[] = [];
/*******************************************************************************************/

  ngOnChanges(changes: SimpleChanges) 
  {

    for (let propName in changes) 
    {
      let chng = changes[propName];
      this.changeDetect = chng.currentValue; // RETURNS THE OBJECT IT SELF
    }
    
    this.recipeName = this.changeDetect.name;
    this.recipeImageSource = this.changeDetect.imagesrc;
    this.recipeDescription = this.changeDetect.description;
    this.recipeUpvotes = this.changeDetect.upvotes;
    this.recipeUpvoted = this.changeDetect.upvoted;
    this.recipeIngredients = this.changeDetect.recipeIngredients;
    this.recipeComments = this.changeDetect.comments;
    this.recipeMaker = this.changeDetect.makerName;

    //this.recipeComments_Slice = this.recipeComments.slice();
    //this.recipeComments = this.recipeComments.slice(1,this.recipeComments.length);

    /*
    if(this.recipeComments[0] === "")
    {
      this.numberOfComments = (this.recipeComments.length - 1);
    }
    else
    {
      this.numberOfComments = (this.recipeComments.length);
    }
*/
/*
    if(this.recipeComments.length > 2)
    {
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
*/
    //console.log("Comments: " + this.recipeComments + "   Latest: " + this.latestComments + "   SLICE: " + this.recipeComments_Slice);

    this.checkUserUpvoteState();
    //this.checkUserProfilePhoto();
  }

/*******************************************************************************************/


/*******************************************************************************************/

ngOnDestroy()
{
  this.commentUnsubscribe.next();
  this.commentUnsubscribe.complete();

  this.upvoteUnsubscribe.next();
  this.upvoteUnsubscribe.complete();

  this.authUnsubscribe.next();
  this.authUnsubscribe.complete();
}

/*******************************************************************************************/


/*******************************************************************************************/
/*
  checkUserProfilePhoto()
  {
    this.authService.getAuth().subscribe(authState => {

      if(authState.photoURL != null && authState.photoURL != "")
      {
        this.commentingProfileImage = authState.photoURL;
      }
      else
      {
        this.commentingProfileImage = "https://i.imgur.com/g2Ju9YJ.png";
      }
      
    });
  }
*/
/*******************************************************************************************/


/*******************************************************************************************/
  checkUserUpvoteState()
  {
    this.commentUnsubscribe.next();
    this.commentUnsubscribe.complete();
    this.upvoteUnsubscribe.next();
    this.upvoteUnsubscribe.complete();

    this.authService.getAuth().takeUntil(this.authUnsubscribe).subscribe(authState => {

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

        })
      })
    });
  }

/*******************************************************************************************/


/*******************************************************************************************/

  upvoteRecipe()
  {
    if(this.canUpvote)
    {
      this.recipeUpvotes = this.recipeUpvotes + 1; 
      this.canUpvote = false; 

      //this.recipesDataService.upvoteRecipe(this.aSelectedRecipe);
      this.upvoteeRecipe2(this.aSelectedRecipe);
    }
    else
    {
      console.log("wtf..");
    }
    
  }

/*******************************************************************************************/


/*******************************************************************************************/
  upvoteSubscription: ISubscription;

  upvoteeRecipe2(recipe: any)
  {
    if(typeof this.commentSubscription != 'undefined')
    {
      this.commentSubscription.unsubscribe();
    }
    else if(typeof this.upvoteSubscription != 'undefined')
    {
      this.upvoteSubscription.unsubscribe();
    }

    let recipeList = this.ngFireDB.list<Recipe>('/recipes', ref => ref.orderByChild('name').equalTo(recipe.name));

    this.upvoteSubscription = recipeList.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(recipes => {
        
      recipeList.update(recipes[0].key, {upvotes:(recipes[0].upvotes+1)});

    });
  }  

/*******************************************************************************************/


/*******************************************************************************************/
  mockComments: string[] = [""];
  commentSubscription: ISubscription;

  addComment({value, valid})
  {

    if(typeof this.upvoteSubscription != 'undefined')
    {
      this.upvoteSubscription.unsubscribe();
    }
    else if(typeof this.commentSubscription != 'undefined')
    {
      this.commentSubscription.unsubscribe();
    }
    
    if(valid)
    {
      this.formValid = true;
      this.numberOfComments++;
      this.recipeComments.unshift(this.commentFormInput);
    
      let recipeList = this.ngFireDB.list<any>('/recipes', ref => ref.orderByChild('name').equalTo(this.aSelectedRecipe.name));

      this.commentSubscription = this.recipesDataService.getDbListObject(recipeList).subscribe(recipes => {
        
        recipeList.update(recipes[0].key, {comments: this.recipeComments});
        
      });

      //this.commentFormInput = null; // clear the form
     /* 
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
      */
    }
    /*
    else
    {
      this.formValid = false;
    }
    */

    /*
    onShowMoreComments()
    {
      this.lotsOfComments = false;
    }
    */

  }
}