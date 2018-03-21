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

      /*{ name:"ONE", description:"ONE", imagesrc:"" },
      { name:"TWO", description:"TWO", imagesrc:"" },
      { name:"THREE", description:"THREE", imagesrc:"" },
      { name:"FOUR", description:"FOUR", imagesrc:"" },
      { name:"FIVE", description:"FIVE", imagesrc:"" }*/
      
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

    for(let i=0; i<this.recipes.length; i++)
    {
      if(this.recipes[i].name == recipeToEdit.name)
      {
        console.log("Changed in recipes");
        this.recipes[i].name = editingData.name;
        this.recipes[i].description = editingData.description;
        this.recipes[i].imagesrc = editingData.imagesrc;
      }
    }


    for(let i=0; i<this.myRecipes.length; i++)
    {
      if(this.myRecipes[i].name == recipeToEdit.name)
      {
        console.log("Changed in myRecipes");
        this.myRecipes[i].name = editingData.name;
        this.myRecipes[i].description = editingData.description;
        this.myRecipes[i].imagesrc = editingData.imagesrc;  
      }
    }

  }

/*******************************************************************************************/



/*******************************************************************************************/
  

  deleteRecipe(recipeToDelete: ARecipe)
  {
       
    for(let i=0; i<this.recipes.length; i++)
    {
      if(this.recipes[i].name == recipeToDelete.name)
      {
        console.log("Deleted from recipes");
        this.recipes.splice(i,1);
        break;
      }
    }
    

    for(let i=0; i<this.myRecipes.length; i++)
    {
      if(this.myRecipes[i].name == recipeToDelete.name)
      {
        console.log("Deleted from myRecipes");
        this.myRecipes.splice(i,1);
        break;
      }
    }

  }

/*******************************************************************************************/

}
