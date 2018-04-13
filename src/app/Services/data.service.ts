import { ARecipe } from './../models/ARecipe';
import { Injectable } from '@angular/core';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {Subject} from 'rxjs/Subject'; 


@Injectable()
export class DataService 
{

/*******************************************************************************************/

  recipes: ARecipe[];
  myRecipes: ARecipe[];
  sortedRecipes: ARecipe[];

  selected: ARecipe;

  data: Observable<ARecipe>; 

/*******************************************************************************************/



/*******************************************************************************************/

  constructor() 
  { 
   this.recipes = [
      { name:"Meal 01", upvoted: false, amounts:[2,3,8,9,5,2], upvotes:31, ingredients:["Meal 01 Ingredient 01","Meal 01 Ingredient 02","Meal 01 Ingredient 03","Meal 01 Ingredient 04","Meal 01 Ingredient 05","Meal 01 Ingredient 06"], description:"Meal 01 description, i don't know what to write, but these food pictures look nice. Trying to get a long description so the 'show more' gets visible and I'm out of words, like i don't even know what am i typing now.", imagesrc:"https://imagesvc.timeincapp.com/v3/mm/image?url=http%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2Fimage%2F2014%2F12%2Fmain%2F1501p77-salmon-lime-hoisin-glaze-crunchy-bok-choy-slaw.jpg%3Fitok%3D6dF2Fohu&w=700&q=85", comments:["Meal 01 Preset Comment 01", "Meal 01 Preset Comment 02", "Meal 01 Preset Comment 03", "Meal 01 Preset Comment 04", "Meal 01 Preset Comment 05"] },
      { name:"Meal 02", upvoted: false, amounts:[2,3,8,9,5], upvotes:11, ingredients:["Meal 02 Ingredient 01","Meal 02 Ingredient 02","Meal 02 Ingredient 03","Meal 02 Ingredient 04","Meal 02 Ingredient 05"], description:"Meal 02 description, i don't know what to write, but these food pictures look nice.", imagesrc:"https://food.fnr.sndimg.com/content/dam/images/food/fullset/2010/12/28/4/FNM_010111-WNDinners-026_s4x3.jpg.rend.hgtvcom.616.462.suffix/1388423053183.jpeg", comments:["Meal 02 Preset Comment 01"] },
      { name:"Meal 03", upvoted: false, amounts:[2,3,8,9,5], upvotes:9, ingredients:["Meal 03 Ingredient 01","Meal 03 Ingredient 02","Meal 03 Ingredient 03","Meal 03 Ingredient 04","Meal 03 Ingredient 05"], description:"Meal 03 description, i don't know what to write, but these food pictures look nice.", imagesrc:"https://az826390.vo.msecnd.net/cdn/media/home/inspiring_recipes/recipes/new_-_b/banana-split-1160x650-bs009445-pub-69303.ashx?la=en&mw=1160&w=1160&hash=C0B98FE0ACF6CCD49CE296682AE5C806375A4311", comments:["Meal 03 Preset Comment 01", "Meal 03 Preset Comment 02"] },
      { name:"Meal 04", upvoted: false, amounts:[2,3,8,9,5], upvotes:9, ingredients:["Meal 04 Ingredient 01","Meal 04 Ingredient 02","Meal 04 Ingredient 03","Meal 04 Ingredient 04","Meal 04 Ingredient 05"], description:"Meal 04 description, i don't know what to write, but these food pictures look nice.", imagesrc:"https://food.fnr.sndimg.com/content/dam/images/food/fullset/2014/2/19/1/WU0701H_Molten-Chocolate-Cakes_s4x3.jpg.rend.hgtvcom.616.462.suffix/1485880987811.jpeg", comments:["Meal 04 Preset Comment 01", "Meal 04 Preset Comment 02"]},
      { name:"Meal 05", upvoted: false, amounts:[2,3,8,9,5], upvotes:25, ingredients:["Meal 05 Ingredient 01","Meal 05 Ingredient 02","Meal 05 Ingredient 03","Meal 05 Ingredient 04","Meal 05 Ingredient 05"], description:"Meal 05 description, i don't know what to write, but these food pictures look nice.", imagesrc:"http://s.doctoroz.com/chicken-leafy-greens-salad-720.jpg", comments:[] },
      { name:"Meal 06", upvoted: false, amounts:[2,3,8,9,5], upvotes:7, ingredients:["Meal 06 Ingredient 01","Meal 06 Ingredient 02","Meal 06 Ingredient 03","Meal 06 Ingredient 04","Meal 06 Ingredient 05"], description:"Meal 06 description, i don't know what to write, but these food pictures look nice. Trying to get a long description so the 'show more' gets visible and I'm out of words, like i don't even know what am i typing now.", imagesrc:"https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/4/5/0/FNM_050112-WN-Dinners-037_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371606179571.jpeg", comments:["Meal 06 Preset Comment 01", "Meal 06 Preset Comment 02", "Meal 06 Preset Comment 03"] },
      { name:"Meal 07", upvoted: false, amounts:[2,3,8,9,5,2], upvotes:27, ingredients:["Meal 07 Ingredient 01","Meal 07 Ingredient 02","Meal 07 Ingredient 03","Meal 07 Ingredient 04","Meal 07 Ingredient 05","Meal 07 Ingredient 06"], description:"Meal 07 description, i don't know what to write, but these food pictures look nice.", imagesrc:"https://img.taste.com.au/kcndz6pd/taste/2016/11/microwave-chocolate-fudge-cake-89332-1.jpeg", comments:[] },
      { name:"Meal 08", upvoted: false, amounts:[2,3,8,9,5], upvotes:12, ingredients:["Meal 08 Ingredient 01","Meal 08 Ingredient 02","Meal 08 Ingredient 03","Meal 08 Ingredient 04","Meal 08 Ingredient 05"], description:"Meal 08 description, i don't know what to write, but these food pictures look nice.", imagesrc:"https://realfood.tesco.com/media/images/steak-polenta1995-LH-21bde053-a232-4c4d-ac9f-b0fd69aa3232-0-1400x919.jpg", comments:["Meal 08 Preset Comment 08"] },
      { name:"Meal 09", upvoted: false, amounts:[2,3,8,9,5], upvotes:18, ingredients:["Meal 09 Ingredient 01","Meal 09 Ingredient 02","Meal 09 Ingredient 03","Meal 09 Ingredient 04","Meal 09 Ingredient 05"], description:"Meal 09 description, i don't know what to write, but these food pictures look nice.", imagesrc:"https://img.taste.com.au/rI_yFqAp/taste/2016/11/raspberry-honey-dessert-cake-92136-1.jpeg", comments:["Meal 09 Preset Comment 01", "Meal 09 Preset Comment 02"] },
      { name:"Meal 10", upvoted: false, amounts:[2,3,8,9,5], upvotes:30, ingredients:["Meal 10 Ingredient 01","Meal 10 Ingredient 02","Meal 10 Ingredient 03","Meal 10 Ingredient 04","Meal 10 Ingredient 05"], description:"Meal 10 description, i don't know what to write, but these food pictures look nice.", imagesrc:"https://144f2a3a2f948f23fc61-ca525f0a2beaec3e91ca498facd51f15.ssl.cf3.rackcdn.com/uploads/food_portal_data/recipes/recipe/hero_article_image/3269/84f8c2467238dcd961dd/compressed_SMALLWARM-CHICKEN-SALAD-WITH-BOODLES-AND-PEANUT-DRESSING-1.jpg", comments:["Meal 10 Preset Comment 01"] },
      { name:"Meal 11", upvoted: false, amounts:[2,3,8,9,5], upvotes:17, ingredients:["Meal 11 Ingredient 11","Meal 11 Ingredient 02","Meal 11 Ingredient 03","Meal 11 Ingredient 04","Meal 11 Ingredient 05"], description:"Meal 11 description, i don't know what to write, but these food pictures look nice.", imagesrc:"https://www.simplyrecipes.com/wp-content/uploads/2012/07/berries-banana-fruit-salad-horiz-a-1600.jpg", comments:["Meal 11 Preset Comment 01", "Meal 11 Preset Comment 02"] },
      { name:"Meal 12", upvoted: false, amounts:[2,3,8,9,5], upvotes:3, ingredients:["Meal 12 Ingredient 12","Meal 12 Ingredient 02","Meal 12 Ingredient 03","Meal 12 Ingredient 04","Meal 12 Ingredient 05"], description:"Meal 12 description, i don't know what to write, but these food pictures look nice.", imagesrc:"https://avatars.mds.yandex.net/get-pdb/34158/3e5245d3-ddeb-40a3-a1cf-964b1ee84d77/orig", comments:[] },
      { name:"Meal 13", upvoted: false, amounts:[2,3,8,9,5,2], upvotes:11, ingredients:["Meal 13 Ingredient 01","Meal 13 Ingredient 02","Meal 13 Ingredient 03","Meal 13 Ingredient 04","Meal 13 Ingredient 05","Meal 13 Ingredient 06"], description:"Meal 13 description, i don't know what to write, but these food pictures look nice.", imagesrc:"http://images-gmi-pmc.edge-generalmills.com/c7fdee4c-e2ec-44d5-8171-b32315081def.jpg", comments:["Meal 13 Preset Comment 01", "Meal 13 Preset Comment 02"] },
      { name:"Meal 14", upvoted: false, amounts:[2,3,8,9,5], upvotes:23, ingredients:["Meal 14 Ingredient 01","Meal 14 Ingredient 02","Meal 14 Ingredient 03","Meal 14 Ingredient 04","Meal 14 Ingredient 05"], description:"Meal 14 description, i don't know what to write, but these food pictures look nice.", imagesrc:"https://s3.amazonaws.com/img.mynetdiary.com/blog/plate-method-for-weight-loss.jpg", comments:["Meal 14 Preset Comment 01", "Meal 14 Preset Comment 02"] },
      { name:"Meal 15", upvoted: false, amounts:[2,3,8,9,5], upvotes:30, ingredients:["Meal 15 Ingredient 01","Meal 15 Ingredient 02","Meal 15 Ingredient 03","Meal 15 Ingredient 04","Meal 15 Ingredient 05"], description:"Meal 15 description, i don't know what to write, but these food pictures look nice.", imagesrc:"https://www.eluniverso.com/sites/default/files/styles/nota_ampliada_normal_foto/public/fotos/2017/06/data17632037.jpg?itok=4OmA-Lg6", comments:["Meal 15 Preset Comment 01"] },
      { name:"Meal 16", upvoted: false, amounts:[2,3,8,9,5], upvotes:16, ingredients:["Meal 16 Ingredient 01","Meal 16 Ingredient 02","Meal 16 Ingredient 03","Meal 16 Ingredient 04","Meal 16 Ingredient 05"], description:"Meal 16 description, i don't know what to write, but these food pictures look nice.", imagesrc:"https://www.taste.com.au/images/recipes/agt/2012/01/28704.jpg", comments:["Meal 16 Preset Comment 01", "Meal 16 Preset Comment 02"] }
    ];


    this.myRecipes = [];

    this.sortedRecipes = [];

    this.sortedRecipes = this.recipes.slice(); // sortedRecipes[] is a copy (slice) of recipes[] (because without using slice(), sortedRecipes becomes a reference to recipes, and therefore changing sortedRecipes changes recipes too. Why? .. because JavaScript) 
    this.updateSortedRecipes();
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


  updateSortedRecipes()
  {
    this.sortedRecipes = this.sortedRecipes.sort((a, b) => b.upvotes - a.upvotes); // sort sortedRecipes[] by upvotes
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
        this.recipes[i].name = editingData.name;
        this.recipes[i].description = editingData.description;
        this.recipes[i].imagesrc = editingData.imagesrc;
        this.recipes[i].upvotes = editingData.upvotes;
        this.recipes[i].ingredients = editingData.ingredients;
        this.recipes[i].amounts = editingData.amounts;
        this.recipes[i].upvoted = editingData.upvoted;
      }
    }


    for(let i=0; i<this.myRecipes.length; i++)
    {
      if(this.myRecipes[i].name == recipeToEdit.name)
      {
        this.myRecipes[i].name = editingData.name;
        this.myRecipes[i].description = editingData.description;
        this.myRecipes[i].imagesrc = editingData.imagesrc;
        this.myRecipes[i].upvotes = editingData.upvotes;
        this.myRecipes[i].ingredients = editingData.ingredients;
        this.myRecipes[i].amounts = editingData.amounts;
        this.myRecipes[i].upvoted = editingData.upvoted;
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


/*******************************************************************************************/

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

/*******************************************************************************************/
}
