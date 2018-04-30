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

  theRecipe: Recipe[];
  private ngUnsubscribe: Subject<any> = new Subject();
  
/*******************************************************************************************/


/*******************************************************************************************/

  constructor(public dataService: DataService, public recipesDataService: RecipesDataService, private authService: AuthService)
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

    checkUserUpvoteState();

  }

/*******************************************************************************************/


/*******************************************************************************************/
  checkUserUpvoteState()
  {
    this.authService.getAuth().subscribe(authState => {
      this.recipesDataService.getDbRecipeByName(this.aSelectedRecipe.name).subscribe(recipes => {
        return recipes.map(recipe => {
          
        })
      })
    });
  }

/*******************************************************************************************/
/*******************************************************************************************/

  upvoteRecipe()
  {
    this.recipeUpvotes = this.recipeUpvotes + 1; // It doesn't update on DB until refresh, so this is just for the view.
    this.recipeUpvoted = true; // same here

    //this.imageSource = "../../../assets/ArrowUp_Blue.jpg";
    //this.dataService.recipeUpvoted(this.recipeName);
    //this.dataService.updateSortedRecipes();

    this.recipesDataService.upvoteRecipe(this.aSelectedRecipe);

    let theRecipe: Recipe[];
    let recipeSubscription = this.recipesDataService.getRecipeObservable().takeUntil(this.ngUnsubscribe).subscribe(val => {
      theRecipe = val

      for(let i=0; i<theRecipe.length; i++)
      {
        if(theRecipe[i].name === this.aSelectedRecipe.name)
        {
          //console.log(theRecipe[i].name + "WAS FOUND");
        }
      } 
    });

  }

/*******************************************************************************************/


/*******************************************************************************************/

  ngOnDestroy()
  {
    // Unsubscribe for safety
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();

    let recipeSubscription = this.recipesDataService.getRecipeObservable().subscribe(val => {});
    recipeSubscription.unsubscribe();
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
