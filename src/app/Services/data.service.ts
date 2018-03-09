import { Injectable } from '@angular/core';

import { ARecipe } from '../Models/ARecipe';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {Subject} from 'rxjs/Subject'; 


@Injectable()
export class DataService 
{

  /*******************************************************************************************/

  recipes: ARecipe[];
  selected: ARecipe;

  data: Observable<ARecipe>; 

  /*******************************************************************************************/

  constructor() 
  { 
    this.recipes = [
      { name:"chicken", description:"just some chicken with rice and whatever, would be nice to have it with tuna too"},
      { name:"another chicken", description:"more chicken, the dish is really nice though, those kind of dishes are really expensive"},
      { name:"an even another chicken", description:"even more chicken, i don't know why too much chicken, i just googled 'meal' and i got chicken, most of the meals were chicken and i choose the most nicest of all"}
    ];
  }

  /*******************************************************************************************/

  getRecipes()
  {
    return this.recipes;  
  }


  addRecipe(recipe: ARecipe)
  {
    this.recipes.unshift(recipe);
  }

  /*******************************************************************************************/

  selectedRecipe(theRecipe: ARecipe)
  {
    this.selected = theRecipe;
  }

  getSelectedRecipe(): ARecipe
  {
    return this.selected;
  }

  /*******************************************************************************************/

  

  /*******************************************************************************************/


}
