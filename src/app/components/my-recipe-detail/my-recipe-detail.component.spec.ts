import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRecipeDetailComponent } from './my-recipe-detail.component';

describe('MyRecipeDetailComponent', () => {
  let component: MyRecipeDetailComponent;
  let fixture: ComponentFixture<MyRecipeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRecipeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
