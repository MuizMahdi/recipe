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
import { NgcFloatButtonModule } from 'ngc-float-button';

// Components
import { AppComponent } from './app.component';
import { RecipesComponent } from './Components/recipes/recipes.component';
import { ARecipeComponent } from './Components/a-recipe/a-recipe.component';
import { RecipeDetailComponent } from './Components/recipe-detail/recipe-detail.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { TopRecipesComponent } from './Components/top-recipes/top-recipes.component';
import { CommentComponent } from './Components/comment/comment.component';
import { LoginComponent } from './Components/login/login.component';
import { ProfileCompletionComponent } from './components/profile-completion/profile-completion.component';
import { RecipeModalComponent } from './Components/recipe-modal/recipe-modal.component';

// Services
import { RecipesDataService } from './Services/recipesData.service';
import { AuthService } from './Services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { nAuthGuard } from './guards/nAuth.guard';
import { ProfileCompletionGuard } from './guards/profileCompletion.guard';

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
import { UserProfileComponent } from './Components/user-profile/user-profile.component';


// Routes 
export const appRoutes: Routes = [
  {path:'', component:HomeComponent, canActivate:[nAuthGuard]},
  {path:'allrecipes', component:RecipesComponent},
  {path:'completeProfile', component:ProfileCompletionComponent},
  {path:'login', component:LoginComponent},
  {path:'profile/:userName', component:UserProfileComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    ARecipeComponent,
    RecipeDetailComponent,
    NavbarComponent,
    HomeComponent,
    TopRecipesComponent,
    CommentComponent,
    LoginComponent,
    ProfileCompletionComponent,
    UserProfileComponent,
    RecipeModalComponent,
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
    NgcFloatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],

  providers: [ 
    RecipesDataService,
    AuthService,
    AuthGuard,
    nAuthGuard,
    ProfileCompletionGuard,
    AngularFireDatabaseModule,
  ],

  bootstrap: [ AppComponent ]
})

export class AppModule { }