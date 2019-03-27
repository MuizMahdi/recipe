import { RecipesDataService } from './../../Services/recipesData.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from './../../models/Recipe';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})

export class RecipesComponent implements OnInit 
{

//-----------------------------------------------------------------------------------------------------------// 
  
  theSelectedRecipe: Recipe;
  recipesDB: Recipe[];

  showRecipeModal: boolean = false;
  selectedRecipeImg: string = "";
  p: number = 1;
  
//-----------------------------------------------------------------------------------------------------------// 

//-----------------------------------------------------------------------------------------------------------// 
  
  constructor(private recipesDataService: RecipesDataService, public afAuth: AngularFireAuth) { }

  ngOnInit() 
  { 
    this.reverseDbRecipes();
  } 

//-----------------------------------------------------------------------------------------------------------// 

//-----------------------------------------------------------------------------------------------------------// 

  reverseDbRecipes()
  {
    this.recipesDataService.getRecipesChanges().subscribe( recipes => {
      this.recipesDB = recipes.reverse();
    });
  }

  getModalState(event: boolean)
  {
    if(event) {
      this.showRecipeModal = false;
    } 
    else {
      this.showRecipeModal = true;
    }
  }

  setSelected(selectedRecipe: Recipe)
  {
    this.showRecipeModal = true;
    this.theSelectedRecipe = selectedRecipe;
    this.selectedRecipeImg = this.theSelectedRecipe.imagesrc;
  }

//-----------------------------------------------------------------------------------------------------------// 
}