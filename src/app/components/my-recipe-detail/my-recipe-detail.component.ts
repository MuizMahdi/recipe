import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { ARecipe } from '../../Models/ARecipe';
import { DataService } from '../../Services/data.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { an_Ingredient } from './../../Models/an_Ingredient';


@Component({
  selector: 'app-my-recipe-detail',
  templateUrl: './my-recipe-detail.component.html',
  styleUrls: ['./my-recipe-detail.component.css']
})


export class MyRecipeDetailComponent implements OnInit 
{


/*******************************************************************************************/

  @Input() aSelectedMyRecipe: ARecipe;
  changeDetect: ARecipe;

  recipeName: string;
  recipeImageSource: string;
  recipeDescription: string;


  closeResult: string;

  formName: string;
  formDescription: string;
  formImageSource: string;

  Ingredients: an_Ingredient[]; // used for editing
  theIngredients: an_Ingredient[]; // used for viewing

  formIngredientName: string;
  formIngredientAmount: number;

  ingredientsNames = [];
  ingredientsAmounts = [];

  recipeIngredient: string[];
  recipeAmount: number[];

  recipeUpvotes: number;
  recipeUpvoted: boolean;
/*******************************************************************************************/



/*******************************************************************************************/

  ngOnChanges(changes: SimpleChanges) 
  {

    for (let propName in changes) 
    {
      let chng = changes[propName];
      this.changeDetect = chng.currentValue;                 // RETURNS THE OBJECT IT SELF
    }
      
    this.recipeName = this.changeDetect.name;
    this.recipeImageSource = this.changeDetect.imagesrc;
    this.recipeDescription = this.changeDetect.description;

    this.recipeUpvotes = this.changeDetect.upvotes;
    this.recipeUpvoted = this.changeDetect.upvoted;

    this.recipeIngredient = this.changeDetect.ingredients;
    this.recipeAmount = this.changeDetect.amounts;


    for(let i=0; i<this.recipeIngredient.length; i++) // assign ingredient names and amounts to array
    {
      this.theIngredients[i] = {name: this.recipeIngredient[i], amount: this.recipeAmount[i]};
    }

  }

/*******************************************************************************************/



/*******************************************************************************************/

  constructor(public dataService: DataService, private modalService: NgbModal) 
  { 
    this.theIngredients = [{name: "", amount:0}];  // For some magical reason, it doesn't work unless initiated on the constructor only !
    this.Ingredients = [];
  }

  ngOnInit() { }

/*******************************************************************************************/



/*******************************************************************************************/
  
  open(content) 
  {
    this.modalService.open(content);

    // clear the forms when modal opens
    this.formName = "";
    this.formDescription = "";
    this.formImageSource = "";
  }

  //////////////////////////////////////////////////////////////////////

  editingData: ARecipe;

  editRecipe()
  {

    for (let myRecipe of this.dataService.getMyRecipes()) // go through the myRecipes array in data service
    {
      if(myRecipe.name == this.recipeName) // and find the name of the recipe on data service that matches the one thats being edited
      {
        this.editingData = {name:this.formName, description:this.formDescription, imagesrc:this.formImageSource, upvotes:this.recipeUpvotes, ingredients:this.ingredientsNames, amounts:this.ingredientsAmounts, upvoted:this.recipeUpvoted}
        // send the data to be edited to edit myRecipe in the data service :-
        this.dataService.editRecipe(myRecipe, this.editingData);
        
        // change values in the viewed detail too !
        this.recipeName = this.formName;
        this.recipeDescription = this.formDescription;
        this.recipeImageSource = this.formImageSource;
      }
    }    
  }

  addIngredient()
  {
    this.Ingredients.push({name: this.formIngredientName, amount: this.formIngredientAmount}); // used for viewing data on the list.

    this.ingredientsNames.push(this.formIngredientName);
    this.ingredientsAmounts.push(this.formIngredientAmount);
    // Names and Amounts are passed as editing data to data service.
  }

/*******************************************************************************************/




/*******************************************************************************************/

  deleteRecipe()
  {
    for (let myRecipe of this.dataService.getMyRecipes()) // go through myRecipes in data service
    {
      if(myRecipe.name == this.recipeName) // if found :-
      {
        // it gets the right recipe here..
        this.dataService.deleteRecipe(myRecipe);
      }
    }
  }

/*******************************************************************************************/



}
