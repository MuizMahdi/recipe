import { environment } from './../../../environments/environment.prod';
import { TopRecipesComponent } from './../top-recipes/top-recipes.component';
import { NavbarComponent } from './../navbar/navbar.component';
import { HeaderComponent } from './../header/header.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgcFloatButtonModule } from 'ngc-float-button';
import { HomeComponent } from './home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from './../../Services/data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './../../Services/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { RecipesDataService } from './../../Services/recipesData.service';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, HeaderComponent, NavbarComponent, TopRecipesComponent ],
      imports: [FormsModule, AngularFireAuthModule, ReactiveFormsModule, MatAutocompleteModule, NgcFloatButtonModule, 
      NgbModule.forRoot(), RouterTestingModule, AngularFireModule.initializeApp(environment.firebase), AngularFireDatabaseModule ],
      providers: [ DataService, AuthService, RecipesDataService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
