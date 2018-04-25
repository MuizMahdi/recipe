// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// External Modules
import { FlashMessagesModule } from 'angular2-flash-messages';
import { NgxPaginationModule } from 'ngx-pagination';
import { ScrollEventModule } from 'ngx-scroll-event';

// Components
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
import { CommentComponent } from './Components/comment/comment.component';
import { ProfileCompletionComponent } from './components/profile-completion/profile-completion.component';

// Services
import { DataService } from './Services/data.service';
import { RecipesDataService } from './Services/recipesData.service';
import { AuthService } from './Services/auth.service';
import { AuthGuard } from './guards/auth.guard';

// Bootstrap
import { NgbModule, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// Angular Material 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material';

// Angular Fire
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { LoginComponent } from './Components/login/login.component';
import { ProfileCompletionComponent } from './Components/profile-completion/profile-completion.component';



// Routes 
const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path:'myrecipes', component:MyRecipesComponent, canActivate:[AuthGuard]},
  {path:'allrecipes', component:AllRecipesComponent},
  {path:'completeProfile', component:ProfileCompletionComponent},
  {path:'login', component:LoginComponent}
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
    CommentComponent,
    LoginComponent,
    ProfileCompletionComponent
  ],

  imports: [
    BrowserModule,
    ScrollEventModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgxPaginationModule,
    FlashMessagesModule.forRoot(),
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

  providers: [ 
    DataService,
    RecipesDataService,
    AuthService,
    AuthGuard,
    AngularFireDatabaseModule,
  ],

  bootstrap: [ AppComponent ]
})


export class AppModule { }
