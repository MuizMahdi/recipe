import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollEventModule } from 'ngx-scroll-event';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLinkActive } from '@angular/router';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { RecipesComponent } from './Components/recipes/recipes.component';
import { MyRecipesComponent } from './Components/my-recipes/my-recipes.component';
import { ARecipeComponent } from './Components/a-recipe/a-recipe.component';
import { RecipeDetailComponent } from './Components/recipe-detail/recipe-detail.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponent } from './Components/home/home.component';
import { MyRecipeDetailComponent } from './Components/my-recipe-detail/my-recipe-detail.component';
import { AllRecipesComponent } from './Components/all-recipes/all-recipes.component';
import { TopRecipesComponent } from './Components/top-recipes/top-recipes.component';

import { DataService } from './Services/data.service';

import { NgbModule, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommentComponent } from './Components/comment/comment.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';



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
    MyRecipeDetailComponent,
    AllRecipesComponent,
    TopRecipesComponent,
    CommentComponent
  ],

  imports: [
    BrowserModule,
    ScrollEventModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes),
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],

  providers: [ DataService ],
  bootstrap: [ AppComponent ]
})


export class AppModule { }
