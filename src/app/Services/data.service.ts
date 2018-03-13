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
  myRecipes: ARecipe[];
  selected: ARecipe;

  data: Observable<ARecipe>; 

/*******************************************************************************************/



/*******************************************************************************************/

  constructor() 
  { 
    this.recipes = [
      { name:"chicken", description:"just some chicken with rice and whatever, would be nice to have it with tuna too", imagesrc:"" },
      { name:"another chicken", description:"more chicken, the dish is really nice though, those kind of dishes are really expensive", imagesrc:""},
      { name:"an even another chicken", description:"even more chicken, i don't know why too much chicken, i just googled 'meal' and i got chicken, most of the meals were chicken and i choose the most nicest of all", imagesrc:""}
    ];

    this.myRecipes = [
      
    ];
  }

/*******************************************************************************************/



/*******************************************************************************************/

  getRecipes()
  {
    return this.recipes;  
  }
  

  getMyRecipes()
  {
    return this.myRecipes;
  }

/*******************************************************************************************/



/*******************************************************************************************/

  addRecipe(recipe: ARecipe)
  {
    this.recipes.unshift(recipe);
  }


  addMyRecipe(myRecipe: ARecipe)
  {
    this.myRecipes.unshift(myRecipe);
  }

/*******************************************************************************************/



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

  editRecipe(recipeToEdit: ARecipe, editingData: ARecipe)
  {

    for (let myRecipe of this.recipes)
    {
      if(myRecipe.name == recipeToEdit.name)
      {
        myRecipe.name = editingData.name;
        myRecipe.description = editingData.description;
        myRecipe.imagesrc = editingData.imagesrc;
      }
    }


    for (let myRecipe of this.myRecipes)
    {
      if(myRecipe.name == recipeToEdit.name)
      {
        myRecipe.name = editingData.name;
        myRecipe.description = editingData.description;
        myRecipe.imagesrc = editingData.imagesrc;

        //that changes it in myRecipes only, changes need to be applied to recipes on front page too !
      }
    }
    
  }

/*******************************************************************************************/


}
