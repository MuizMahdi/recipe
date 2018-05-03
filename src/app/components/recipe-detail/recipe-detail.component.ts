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
  SingularOrPlural: string;

  canUpvote: boolean = true;

  theRecipe: Recipe[];
  private ngUnsubscribe: Subject<any> = new Subject();
  
/*******************************************************************************************/


/*******************************************************************************************/

  constructor(public dataService: DataService, public recipesDataService: RecipesDataService, private authService: AuthService, private ngFireDB: AngularFireDatabase)
  { 
    //this.theIngredients = [{name: "", amount:0}];  // For some magical reason, it doesn't work unless initiated on the constructor only !
    //this.theIngredients2 = [{ ingredientsName:"", ingredientsAmount:0 }];
    //this.theIngredients2 = [{ name:"", amount:0 }];
    this.latestComments = [];
  }

  ngOnInit()
  {  }

/*******************************************************************************************/


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

    this.recipeComments_Slice = this.recipeComments.slice();
    this.numberOfComments = this.recipeComments.length;

    if(this.recipeComments.length > 2)
    {
      for(let i=0; i<3; i++)
      {
        this.latestComments[i] = this.recipeComments_Slice[i];
      }

      this.lotsOfComments = true;
    }
    else {
      this.lotsOfComments = false;
    }

    if(this.recipeComments.length == 1)
    {
      this.SingularOrPlural = "Comment";
    }
    else
    {
      this.SingularOrPlural = "Comments";
    }

    
    this.checkUserUpvoteState();
    console.log(this.canUpvote);

  }

/*******************************************************************************************/


/*******************************************************************************************/
  checkUserUpvoteState()
  {
    console.log(this.aSelectedRecipe.name);

    this.authService.getAuth().takeUntil(this.unsubscribe).subscribe(authState => {

      this.recipesDataService.getDbRecipeByName(this.aSelectedRecipe.name).takeUntil(this.unsubscribe).subscribe(recipes => {
        return recipes.map(recipe => {

          console.log(recipe.upvoters);
          console.log(authState.displayName);

          this.canUpvote = true;

          for(let i=0; i<recipe.upvoters.length; i++)
          {
            if(recipe.upvoters[i] === authState.displayName)
            {
              this.canUpvote = false;
            }
          }
          


          /*
          for(let i=0; i<this.aSelectedRecipe.upvoters.length; i++)
          {
            if(recipe.upvoters[i] === authState.displayName)
            {
              this.canUpvote = false;
              this.recipeUpvoted = true;
              console.log("CANNOT BE UPVOTED");
            }
            else
            {
              this.canUpvote = true;
              this.recipeUpvoted = false;
              console.log("CAN BE UPVOTED");
            }
          }
          */

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
      //this.upvoteRecapy(this.aSelectedRecipe);

      this.recipeUpvotes = this.recipeUpvotes + 1; 
      this.canUpvote = false; 

      this.recipesDataService.upvoteRecipe(this.aSelectedRecipe);
    }
    else
    {
      console.log("wtf..");
    }
    
  }

/*******************************************************************************************/


/*******************************************************************************************/

  upvoteRecapy(recipe: Recipe)
  {
    console.log(this.canUpvote);

    this.authSubscription = this.authService.getAuth().takeUntil(this.unsubscribe).subscribe(authState => {
      this.recipeSubscription = this.recipesDataService.getDbRecipeByName(recipe.name).takeUntil(this.unsubscribe).subscribe(recipes => {
        return recipes.map(recipe => {
          
          let recipeList = this.ngFireDB.list<Recipe>('/recipes', ref => ref.orderByChild('name').equalTo(recipe.name));

          recipeList.update(recipe.key, {
            RID: recipe.RID,
            name: recipe.name,
            makerName: recipe.makerName,
            description: recipe.description,
            imagesrc: recipe.imagesrc,
            upvotes: recipe.upvotes+1,
            upvoted: recipe.upvoted, 
            recipeIngredients: recipe.recipeIngredients,
            comments: recipe.comments,
            upvoters: recipe.upvoters
          });

        })
      })
    }); 
  }
  
/*******************************************************************************************/


/*******************************************************************************************/

  ngOnDestroy()
  {
    // Unsubscribe for safety
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();

    //this.authSubscription.unsubscribe();
    //this.recipeSubscription.unsubscribe();
  }

/*******************************************************************************************/


/*******************************************************************************************/

  addComment()
  {
    this.recipeComments.push(this.commentFormInput);
    this.commentFormInput = " "; // clear the form 
  }

  onShowMoreComments()
  {
    this.lotsOfComments = false;
  }

/*******************************************************************************************/



}
