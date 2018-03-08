import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipesComponent } from './Components/recipes/recipes.component';
import { MyRecipesComponent } from './Components/my-recipes/my-recipes.component';
import { BookmarksComponent } from './Components/bookmarks/bookmarks.component';

import { DataService } from './Services/data.service';
import { RecipeDetailComponent } from './Components/recipe-detail/recipe-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    RecipesComponent,
    MyRecipesComponent,
    BookmarksComponent,
    RecipeDetailComponent
  ],

  imports: [
    BrowserModule
  ],

  providers: [ DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
