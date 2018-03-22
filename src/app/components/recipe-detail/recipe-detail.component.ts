import { an_Ingredient } from './../../Models/an_Ingredient';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ARecipe } from '../../Models/ARecipe';
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

  @Input() aSelectedRecipe: ARecipe;
  changeDetect: ARecipe;

  recipeName: string;
  recipeImageSource: string;
  recipeDescription: string;
  recipeIngredients: string[];
  recipeAmounts: number[];
  recipeUpvotes: number;

  theIngredients: an_Ingredient[];

  /*******************************************************************************************/

  ngOnChanges(changes: SimpleChanges) 
  {
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
    this.recipeAmounts = this.changeDetect.amounts;

    
    for(let i=0; i<this.recipeIngredients.length; i++)
    {
      this.theIngredients[i] = {name: this.recipeIngredients[i], amount: this.recipeAmounts[i]};
    }

    

    console.log(this.theIngredients);
    
  }

  /*******************************************************************************************/

  /*******************************************************************************************/

  constructor(public dataService: DataService)
  { 
    this.theIngredients = [{name: "", amount:0}];  // For some magical reason, it doesn't work unless initiated on the constructor only !
  }

  ngOnInit() {  }

}
