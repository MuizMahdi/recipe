import { ARecipeComponent } from './../a-recipe/a-recipe.component';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

//import { RecipeComponent } from '../recipe/recipe.component';
import { ARecipe } from '../../models/ARecipe';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})


export class RecipesComponent implements OnInit 
{

  recipes: ARecipe[];
  theSelectedRecipe: ARecipe;
  p: number = 1;

  showFormVals: boolean = true;


  fCtrl = new FormControl;  
  fGroup = new FormGroup({
    fCtrl: new FormControl()
  });
  public options = ['option1', 'option2', 'option3','option4','option5','option6','option7','option8','option9','option10','option11','option12','option13'];



  constructor(public dataService: DataService, private formBuilder: FormBuilder) 
  { }

  ngOnInit() 
  { 
    this.recipes = this.dataService.getRecipes();
  }

  addRecipe(recipe: ARecipe)
  {
    this.dataService.addRecipe(recipe);
  }

  boxChecked()
  {
    this.showFormVals = false;
  }

  setSelected(selectedRecipe: ARecipe)
  {
    this.dataService.selectedRecipe(selectedRecipe);
    this.theSelectedRecipe = selectedRecipe;

    //console.log(this.theSelectedRecipe);
    // it receices the right recipe when clicking all good !

    //this.dataService.selectedRecipe(this.theSelectedRecipe);
    //console.log("selected recipe passed to data service")
    
  }

}