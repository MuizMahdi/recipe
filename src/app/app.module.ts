import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScrollEventModule } from 'ngx-scroll-event';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { RecipesComponent } from './Components/recipes/recipes.component';
import { MyRecipesComponent } from './Components/my-recipes/my-recipes.component';
import { ARecipeComponent } from './Components/a-recipe/a-recipe.component';
import { RecipeDetailComponent } from './Components/recipe-detail/recipe-detail.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponent } from './Components/home/home.component';
import { MyRecipeComponent } from './Components/my-recipe/my-recipe.component';
import { MyRecipeDetailComponent } from './Components/my-recipe-detail/my-recipe-detail.component';
import { AllRecipesComponent } from './Components/all-recipes/all-recipes.component';
import { TopRecipesComponent } from './Components/top-recipes/top-recipes.component';

import { DataService } from './Services/data.service';

import { NgbModule, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';



// Routes 
const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path:'myrecipes', component:MyRecipesComponent},
  {path:'allrecipes', component:AllRecipesComponent}
];



@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    MyRecipesComponent,
    ARecipeComponent,
    RecipeDetailComponent,
    NavbarComponent,
    HeaderComponent,
    HomeComponent,
    MyRecipeComponent,
    MyRecipeDetailComponent,
    AllRecipesComponent,
    TopRecipesComponent
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
