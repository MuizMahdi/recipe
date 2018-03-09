import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScrollEventModule } from 'ngx-scroll-event';


import { AppComponent } from './app.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipesComponent } from './Components/recipes/recipes.component';
import { MyRecipesComponent } from './Components/my-recipes/my-recipes.component';
import { BookmarksComponent } from './Components/bookmarks/bookmarks.component';
import { RecipeDetailComponent } from './Components/recipe-detail/recipe-detail.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HeaderComponent } from './Components/header/header.component';

import { DataService } from './Services/data.service';





@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    RecipesComponent,
    MyRecipesComponent,
    BookmarksComponent,
    RecipeDetailComponent,
    NavbarComponent,
    HeaderComponent
  ],

  imports: [
    BrowserModule,
    ScrollEventModule
  ],

  providers: [ DataService ],
  bootstrap: [ AppComponent ]
})


export class AppModule { }
