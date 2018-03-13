import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScrollEventModule } from 'ngx-scroll-event';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipesComponent } from './Components/recipes/recipes.component';
import { MyRecipesComponent } from './Components/my-recipes/my-recipes.component';
import { BookmarksComponent } from './Components/bookmarks/bookmarks.component';
import { RecipeDetailComponent } from './Components/recipe-detail/recipe-detail.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponent } from './Components/home/home.component';

import { DataService } from './Services/data.service';

import {NgbModule, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MyRecipeComponent } from './Components/my-recipe/my-recipe.component';
import { MyRecipeDetailComponent } from './Components/my-recipe-detail/my-recipe-detail.component';




// Routes 
const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path:'myrecipes', component:MyRecipesComponent}
];



@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    RecipesComponent,
    MyRecipesComponent,
    BookmarksComponent,
    RecipeDetailComponent,
    NavbarComponent,
    HeaderComponent,
    HomeComponent,
    MyRecipeComponent,
    MyRecipeDetailComponent
  ],

  imports: [
    BrowserModule,
    ScrollEventModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],

  providers: [ DataService ],
  bootstrap: [ AppComponent ]
})


export class AppModule { }
