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
  topRecipes: ARecipe[];
  selected: ARecipe;

  data: Observable<ARecipe>; 

/*******************************************************************************************/



/*******************************************************************************************/

  constructor() 
  { 
   this.recipes = [
      { name:"Meal 01", upvotes:14, ingredients:["Meal 01 Ingredient 01","Meal 01 Ingredient 02","Meal 01 Ingredient 03","Meal 01 Ingredient 04","Meal 01 Ingredient 05"], description:"Meal 01 description, i don't know what to write, but these food pictures look nice.", imagesrc:"../../../assets/Meals/M01.jpg" },
      { name:"Meal 02", upvotes:13, ingredients:["Meal 02 Ingredient 01","Meal 02 Ingredient 02","Meal 02 Ingredient 03","Meal 02 Ingredient 04","Meal 02 Ingredient 05"], description:"Meal 02 description, i don't know what to write, but these food pictures look nice.", imagesrc:"../../../assets/Meals/M02.jpg" },
      { name:"Meal 03", upvotes:22, ingredients:["Meal 03 Ingredient 01","Meal 03 Ingredient 02","Meal 03 Ingredient 03","Meal 03 Ingredient 04","Meal 03 Ingredient 05"], description:"Meal 03 description, i don't know what to write, but these food pictures look nice.", imagesrc:"../../../assets/Meals/M03.jpg" },
      { name:"Meal 04", upvotes:29, ingredients:["Meal 04 Ingredient 01","Meal 04 Ingredient 02","Meal 04 Ingredient 03","Meal 04 Ingredient 04","Meal 04 Ingredient 05"], description:"Meal 04 description, i don't know what to write, but these food pictures look nice.", imagesrc:"../../../assets/Meals/M04.jpg" },
      { name:"Meal 05", upvotes:15, ingredients:["Meal 05 Ingredient 01","Meal 05 Ingredient 02","Meal 05 Ingredient 03","Meal 05 Ingredient 04","Meal 05 Ingredient 05"], description:"Meal 05 description, i don't know what to write, but these food pictures look nice.", imagesrc:"../../../assets/Meals/M05.jpg" },
      { name:"Meal 06", upvotes:7, ingredients:["Meal 06 Ingredient 01","Meal 06 Ingredient 02","Meal 06 Ingredient 03","Meal 06 Ingredient 04","Meal 06 Ingredient 05"], description:"Meal 06 description, i don't know what to write, but these food pictures look nice.", imagesrc:"../../../assets/Meals/M06.jpg" },
      { name:"Meal 07", upvotes:11, ingredients:["Meal 07 Ingredient 01","Meal 07 Ingredient 02","Meal 07 Ingredient 03","Meal 07 Ingredient 04","Meal 07 Ingredient 05"], description:"Meal 07 description, i don't know what to write, but these food pictures look nice.", imagesrc:"../../../assets/Meals/M07.jpg" },
      { name:"Meal 08", upvotes:18, ingredients:["Meal 08 Ingredient 01","Meal 08 Ingredient 02","Meal 08 Ingredient 03","Meal 08 Ingredient 04","Meal 08 Ingredient 05"], description:"Meal 08 description, i don't know what to write, but these food pictures look nice.", imagesrc:"../../../assets/Meals/M08.jpg" },
      { name:"Meal 09", upvotes:12, ingredients:["Meal 09 Ingredient 01","Meal 09 Ingredient 02","Meal 09 Ingredient 03","Meal 09 Ingredient 04","Meal 09 Ingredient 05"], description:"Meal 09 description, i don't know what to write, but these food pictures look nice.", imagesrc:"../../../assets/Meals/M09.png" },
      { name:"Meal 10", upvotes:21, ingredients:["Meal 10 Ingredient 01","Meal 10 Ingredient 02","Meal 10 Ingredient 03","Meal 10 Ingredient 04","Meal 10 Ingredient 05"], description:"Meal 10 description, i don't know what to write, but these food pictures look nice.", imagesrc:"../../../assets/Meals/M10.png" },
      { name:"Meal 11", upvotes:17, ingredients:["Meal 11 Ingredient 11","Meal 11 Ingredient 02","Meal 11 Ingredient 03","Meal 11 Ingredient 04","Meal 11 Ingredient 05"], description:"Meal 11 description, i don't know what to write, but these food pictures look nice.", imagesrc:"../../../assets/Meals/M11.jpg" },
      { name:"Meal 12", upvotes:3, ingredients:["Meal 12 Ingredient 12","Meal 12 Ingredient 02","Meal 12 Ingredient 03","Meal 12 Ingredient 04","Meal 12 Ingredient 05"], description:"Meal 12 description, i don't know what to write, but these food pictures look nice.", imagesrc:"../../../assets/Meals/M12.jpg" },
      { name:"Meal 13", upvotes:11, ingredients:["Meal 13 Ingredient 01","Meal 13 Ingredient 02","Meal 13 Ingredient 03","Meal 13 Ingredient 04","Meal 13 Ingredient 05"], description:"Meal 13 description, i don't know what to write, but these food pictures look nice.", imagesrc:"../../../assets/Meals/M13.jpg" },
      { name:"Meal 14", upvotes:23, ingredients:["Meal 14 Ingredient 01","Meal 14 Ingredient 02","Meal 14 Ingredient 03","Meal 14 Ingredient 04","Meal 14 Ingredient 05"], description:"Meal 14 description, i don't know what to write, but these food pictures look nice.", imagesrc:"../../../assets/Meals/M14.jpg" },
      { name:"Meal 15", upvotes:19, ingredients:["Meal 15 Ingredient 01","Meal 15 Ingredient 02","Meal 15 Ingredient 03","Meal 15 Ingredient 04","Meal 15 Ingredient 05"], description:"Meal 15 description, i don't know what to write, but these food pictures look nice.", imagesrc:"../../../assets/Meals/M15.jpg" },
      { name:"Meal 16", upvotes:16, ingredients:["Meal 16 Ingredient 01","Meal 16 Ingredient 02","Meal 16 Ingredient 03","Meal 16 Ingredient 04","Meal 16 Ingredient 05"], description:"Meal 16 description, i don't know what to write, but these food pictures look nice.", imagesrc:"../../../assets/Meals/M16.jpg" }
    ];


    this.myRecipes = [
      /* added recipes will be unshifted over here */
    ];

    this.topRecipes = [
      /* Recipes with top 5 upvotes will be unshifted over here */
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
