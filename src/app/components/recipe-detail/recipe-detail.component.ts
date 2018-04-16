import { Recipe } from './../../models/Recipe';
import { RecipesDataService } from './../../Services/recipesData.service';
import { an_Ingredient } from './../../models/an_Ingredient';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ARecipe } from '../../models/ARecipe';
import { DataService } from '../../Services/data.service';
import { Observable } from 'rxjs/Observable';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';

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
  recipeImageSource: string;
  recipeDescription: string;

  recipeIngredients: string[];
  recipeComments: string[];
  recipeAmounts: number[];

  //theIngredients: an_Ingredient[];
  theIngredients2: [{ ingredientsName:string, ingredientsAmount:number }];
  recipeIngredientsNames: string[];
  recipeIngredientsAmounts: number[];

  recipeUpvotes: number;
  recipeUpvoted: boolean;

  imageSource: string = "../../../assets/ArrowUp_Gray.jpg";

  commentFormInput: string;
  latestComments: string[];
  lotsOfComments: boolean = false;
  numberOfComments: number;
  recipeComments_Slice: string[];
  SingularOrPlural: string;
/*******************************************************************************************/


/*******************************************************************************************/

constructor(public dataService: DataService, public recipesDataService: RecipesDataService)
{ 
  //this.theIngredients = [{name: "", amount:0}];  // For some magical reason, it doesn't work unless initiated on the constructor only !
  //this.theIngredients2 = [{ ingredientsName:"", ingredientsAmount:0 }];
  this.theIngredients2 = [{ ingredientsName:"", ingredientsAmount:0 }];
  this.latestComments = [];
}

ngOnInit() {  }

/*******************************************************************************************/


/*******************************************************************************************/

  ngOnChanges(changes: SimpleChanges) 
  {

    // Clear the old values on change so it wont mix them up with the new values.
    this.theIngredients2 = [{ ingredientsName:"", ingredientsAmount:0 }];

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
    this.recipeIngredientsNames = this.changeDetect.ingredientsNames;
    this.recipeIngredientsAmounts = this.changeDetect.ingredientsAmounts;
    this.recipeComments = this.changeDetect.comments;


    for(let i=0; i<this.recipeIngredientsNames.length; i++) // assign ingredient names and amounts to array
    {
      this.theIngredients2[i] = {ingredientsName: this.recipeIngredientsNames[i], ingredientsAmount: this.recipeIngredientsAmounts[i]};
    }


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
    

    
    
  }

/*******************************************************************************************/


/*******************************************************************************************/

  upvoteRecipe()
  {
    this.recipeUpvotes = this.recipeUpvotes + 1; // It doesn't update on DB until refresh, so this is just for the view.
    this.recipeUpvoted = true;

    //this.imageSource = "../../../assets/ArrowUp_Blue.jpg";
    //this.dataService.recipeUpvoted(this.recipeName);
    //this.dataService.updateSortedRecipes();

    this.recipesDataService.updateRecipe(this.aSelectedRecipe);
  }

/*******************************************************************************************/


/*******************************************************************************************/
/*
recipeUpvoted(recipeName: string)
{
  for(let i=0; i<this.recipes.length; i++)
  {
    if(this.recipes[i].name == recipeName)
    {
      this.recipes[i].upvoted = true;
      this.recipes[i].upvotes =  this.recipes[i].upvotes + 1;
      break;
    }
  }
  

  for(let i=0; i<this.myRecipes.length; i++)
  {
    if(this.myRecipes[i].name == recipeName)
    {
      this.myRecipes[i].upvoted = true; // wtf, hold on !
      this.myRecipes[i].upvotes =  this.myRecipes[i].upvotes + 1;
      break;
    }
  }
}
*/
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
