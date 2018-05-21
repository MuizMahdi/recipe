import { environment } from './../../../environments/environment.prod';
import { CommentComponent } from './../comment/comment.component';
import { ARecipeComponent } from './../a-recipe/a-recipe.component';
import { RecipeDetailComponent } from './../recipe-detail/recipe-detail.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './../navbar/navbar.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgcFloatButtonModule } from 'ngc-float-button';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipesDataService } from './../../Services/recipesData.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthService } from './../../Services/auth.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserProfileComponent } from './user-profile.component';


describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileComponent, NavbarComponent, RecipeDetailComponent, ARecipeComponent, CommentComponent ],
      imports: [ FormsModule, ReactiveFormsModule, MatAutocompleteModule, NgcFloatButtonModule, RouterTestingModule,
      AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebase), AngularFireDatabaseModule, NgbModule.forRoot() ],
      providers: [ RecipesDataService, AuthService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
