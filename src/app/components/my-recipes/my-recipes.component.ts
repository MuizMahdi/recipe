import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';

import { ARecipe } from '../../Models/ARecipe';



@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css']
})



export class MyRecipesComponent implements OnInit 
{
  
  myRecipes: ARecipe[];
  theSelectedRecipe: ARecipe;


  constructor(public dataService: DataService) {  }


  ngOnInit() 
  {
    this.myRecipes = this.dataService.getMyRecipes();
  }

  setSelected(selectedRecipe: ARecipe)
  {
    this.dataService.selectedRecipe(selectedRecipe);
    this.theSelectedRecipe = selectedRecipe;  
  }

}
