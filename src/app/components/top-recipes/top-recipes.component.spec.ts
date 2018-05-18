import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from './../../Services/data.service';

import { TopRecipesComponent } from './top-recipes.component';

describe('TopRecipesComponent', () => {
  let component: TopRecipesComponent;
  let fixture: ComponentFixture<TopRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopRecipesComponent ],
      imports: [ ],
      providers: [ DataService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
