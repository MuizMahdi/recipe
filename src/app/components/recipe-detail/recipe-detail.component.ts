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
  @Input() aSelectedRecipe: ARecipe;
  changeDetect: ARecipe;

  recipeName: string;
  recipeImageSource: string;
  recipeDescription: string;

  recipeIngredients: string[];
  recipeComments: string[];
  recipeAmounts: number[];

  theIngredients: an_Ingredient[];

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

constructor(public dataService: DataService)
{ 
  this.theIngredients = [{name: "", amount:0}];  // For some magical reason, it doesn't work unless initiated on the constructor only !
  this.latestComments = [];
}

ngOnInit() {  }

/*******************************************************************************************/


/*******************************************************************************************/

  ngOnChanges(changes: SimpleChanges) 
  {

    this.theIngredients = [{name: "", amount:0}]; // Clear the old values on change so it wont mix them up with the new values.

    for (let propName in changes) 
    {
      let chng = changes[propName];
      this.changeDetect = chng.currentValue;                 // RETURNS THE OBJECT IT SELF

      //this.theRecipe  = JSON.stringify(chng.currentValue);  // RETURNS A STRING OF THE OBJECT, NOT THE OBJECT IT SELF
      //let prev = JSON.stringify(chng.previousValue);
    }
    
    //console.log(changes);
      
    this.recipeName = this.changeDetect.name;
    this.recipeImageSource = this.changeDetect.imagesrc;
    this.recipeDescription = this.changeDetect.description;

    this.recipeUpvotes = this.changeDetect.upvotes;

    this.recipeIngredients = this.changeDetect.ingredients;
    this.recipeComments = this.changeDetect.comments;
    this.recipeAmounts = this.changeDetect.amounts;

    this.recipeUpvoted = this.changeDetect.upvoted;
    

    for(let i=0; i<this.recipeIngredients.length; i++) // assign ingredient names and amounts to array
    {
      this.theIngredients[i] = {name: this.recipeIngredients[i], amount: this.recipeAmounts[i]};
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
    this.recipeUpvotes = this.recipeUpvotes + 1;
    this.recipeUpvoted = true;
    this.imageSource = "../../../assets/ArrowUp_Blue.jpg";
    this.dataService.recipeUpvoted(this.recipeName);

    this.dataService.updateSortedRecipes();

    console.log(this.recipeComments);
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
