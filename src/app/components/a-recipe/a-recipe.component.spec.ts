import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ARecipeComponent } from './a-recipe.component';

describe('ARecipeComponent', () => {
  let component: ARecipeComponent;
  let fixture: ComponentFixture<ARecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ARecipeComponent ],
      providers: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ARecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component = new ARecipeComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should keep recipe description as is, if less than 90 characters long', () => {
    component.recipe2.description = "1";
    component.initShowMore();
    expect(component.miniDescription.length).toBe(component.recipe2.description.length);
    expect(component.shortText).toBeTruthy();

  });

  it('should limit recipe description to 90 characters, if more than 90 characters long', () => {
    component.recipe2.description = "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
    component.initShowMore();
    expect(component.miniDescription.length).toBe(93);
    expect(component.shortText).toBeFalsy();
  });

  it('should keep recipe image as is, if image source url is more than 5 characters long', () => {
    component.recipe2.imagesrc = "000000";
    component.randomizeImages();
    expect(component.imageSource).toBe(component.recipe2.imagesrc);
  });

  it('should set the recipe image to default, if image source url is less than 5 characters long', () => {
    component.recipe2.imagesrc = "000";
    component.randomizeImages();
    expect(component.recipe2.imagesrc).toBe("https://cdn3.iconfinder.com/data/icons/food-and-ingredients/512/Food_and_Drinks_Fish_dish-01-512.png");
  });

  it('should emit an event of a recipe when selected', () => {
    spyOn(component.theRecipeSelected2, 'emit');
    component.getSelected2();
    expect(component.theRecipeSelected2.emit).toHaveBeenCalled();
    expect(component.theRecipeSelected2.emit).toHaveBeenCalledWith(component.recipe2);
  });

  it('should show full description if showmore is clicked and showMoreText is false', () => {
    component.showMoreText = false;
    component.showMore();
    expect(component.recipe2.description).toBe(component.fullDescription);
  });

  it('should minimized description if showmore is clicked and showMoreText is true', () => {
    component.showMoreText = true;
    component.showMore();
    expect(component.recipe2.description).toBe(component.miniDescription);
  });
  
});
