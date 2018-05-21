import { NavbarComponent } from './../navbar/navbar.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { environment } from './../../../environments/environment.prod';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgcFloatButtonModule } from 'ngc-float-button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './../../Services/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { RecipesDataService } from './../../Services/recipesData.service';

import { MyRecipesComponent } from './my-recipes.component';

describe('MyRecipesComponent', () => {
  let component: MyRecipesComponent;
  let fixture: ComponentFixture<MyRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRecipesComponent, NavbarComponent ],
      imports: [ MatAutocompleteModule, FormsModule, ReactiveFormsModule, NgcFloatButtonModule, NgbModule.forRoot(), 
      RouterTestingModule, AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebase), AngularFireDatabaseModule ],
      providers: [ AuthService, RecipesDataService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
