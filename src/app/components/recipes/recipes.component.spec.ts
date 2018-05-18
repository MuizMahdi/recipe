import { environment } from './../../../environments/environment.prod';
import { ARecipeComponent } from './../a-recipe/a-recipe.component';
import { RecipeDetailComponent } from './../recipe-detail/recipe-detail.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { CommentComponent } from './../comment/comment.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { DataService } from './../../Services/data.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { RecipesDataService } from './../../Services/recipesData.service';
import { AuthService } from './../../Services/auth.service';

import { RecipesComponent } from './recipes.component';

describe('RecipesComponent', () => {
  let component: RecipesComponent;
  let fixture: ComponentFixture<RecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipesComponent, RecipeDetailComponent, ARecipeComponent, CommentComponent ],
      imports: [ FormsModule, ReactiveFormsModule, NgxPaginationModule, RouterTestingModule, AngularFireAuthModule,
      AngularFireModule.initializeApp(environment.firebase), AngularFireDatabaseModule ],
      providers: [ DataService, RecipesDataService, AuthService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
