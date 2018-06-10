import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-recipes',
  templateUrl: './top-recipes.component.html',
  styleUrls: ['./top-recipes.component.css']
})

export class TopRecipesComponent implements OnInit 
{
  
  //sortedRecipes: ARecipe[];
  //topRecipes: ARecipe[];


constructor(/*private dataService: DataService*/) 
  { 
    //this.topRecipes = [];
    //this.sortedRecipes = dataService.sortedRecipes;
    //this.getTopRecipesData();
  }

  
  /*
  getTopRecipesData()
  {
    for(var i=0; i<6; i++)
    {
      this.topRecipes[i] = this.sortedRecipes[i];
    }
  }
  */

  ngOnInit(){}

}
