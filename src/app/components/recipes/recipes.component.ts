import { ARecipeComponent } from './../a-recipe/a-recipe.component';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';

//import { RecipeComponent } from '../recipe/recipe.component';
import { ARecipe } from '../../models/ARecipe';

import { AngularFireDatabase } from 'angularfire2/database';

import { Client } from './../../models/clients';
import { ClientService } from './../../Services/client.service';

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
  clients: Client[];
  totalOwned: number;

  constructor(public dataService: DataService, db: AngularFireDatabase, public clientService: ClientService) 
  { 
    /*db.list('/clients').valueChanges().subscribe( client => {
      this.clients = client;
    })*/
  }

  ngOnInit() 
  { 
    this.recipes = this.dataService.getRecipes();
    window.scroll({top: 0, left: 0, behavior: 'smooth' });

    this.clients = this.clientService.getClients().subscribe(clients =>{
      this.clients = clients;
    });
  }

 

  addRecipe(recipe: ARecipe)
  {
    this.dataService.addRecipe(recipe);
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