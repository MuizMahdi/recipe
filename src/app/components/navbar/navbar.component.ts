import { RecipesDataService } from './../../Services/recipesData.service';
import { RecipesComponent } from './../recipes/recipes.component';
import { ARecipe } from './../../models/ARecipe';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../Services/auth.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit 
{
  
  locationOnTop: boolean = true;
  locationNotOnTop: boolean = false;
  navState: string ="navbar sticky-top navbar-expand-lg navbar-dark bg-dark"; //starts being transparent (remove navbar-dark bg-dark so it doesn't start black)
  
  formGroup: FormGroup;

  private modalRef: NgbModalRef;
  
  // RECIPE SEARCH VARIABLES
  options: string[] = [];
  optionsSlice: string[] = [];
  optionsTemp: string[] = [];
  recipes: ARecipe[] = this.dataService.getRecipes();

  // AUTHENTICATION RELATED VARIABLES
  isLoggedIn: boolean;
  loggedInUserEmail:string;
  loggedInUserName: string;

  // RECIPE ADDING MODAL VARIABLES
  recipeAddFormGroup: FormGroup;
  recipeName: string;
  recipeDescription: string;
  recipeImageUrl: string;
  recipeIngredient: string;
  recipeIngredientAmount: string;
  recipeIngredientsArr: any[] = [];
  recipeComments: string[] = [];
  submitClicked: boolean = false;
  imageUrlError: boolean = false;
  formImageSource: string = null;


  constructor(public dataService: DataService, private formBuilder: FormBuilder, private router: Router, 
    private authService: AuthService, private modalService: NgbModal, private recipesDataService: RecipesDataService) 
  { 
    this.buildForm();
    this.getRecipesNames();
    this.checkFormCtrlChanges();
  }


  ngOnInit()
  {
    this.authService.getAuth().subscribe(auth => {
      if(auth)
      {
        this.isLoggedIn = true;
        this.loggedInUserEmail = auth.email;
      }
      else
      {
        this.isLoggedIn = false;
      }
    });
  }


  buildForm()
  {
    this.formGroup = this.formBuilder.group({
      formCtrl: ['', Validators.required]
    });

    this.recipeAddFormGroup = new FormGroup({
      recipeNameCtrl: new FormControl(null, [Validators.required]),
      recipeDescriptionCtrl: new FormControl(null, []),
      recipeImageUrlCtrl: new FormControl(null, [Validators.required]),
      anIngredientCtrl: new FormControl(null, []),
      anIngredientAmountCtrl: new FormControl(null, []),
    });
  }


  getRecipesNames()
  {
    for(let i=0; i<this.dataService.getRecipes().length; i++)
    {
      this.options[i] = this.dataService.getRecipes()[i].name;
    }
    this.optionsSlice = this.options.slice();
  }


  onSearch()
  {

    for(var i=0; i<this.dataService.getRecipes().length; i++)
    {
      if(this.formGroup.get('formCtrl').value === this.dataService.getRecipes()[i].name)
      {
        console.log(this.dataService.getRecipes()[i].name);
        this.router.navigate(['./allrecipes']);
        this.dataService.selectedRecipe(this.dataService.getRecipes()[i]);
        window.scroll({top: 0, left: 0, behavior: 'smooth' });
        break;
      }

      if( (i == this.dataService.getRecipes().length - 1) && (this.formGroup.get('formCtrl').value !== this.dataService.getRecipes()[i].name) ) 
      {
        alert("There is no such recipe posted.");
        break;
      }
    }

  }


  checkFormCtrlChanges()
  {
    const formControl = this.formGroup.get('formCtrl');

    formControl.valueChanges.forEach( (value: string) => {

      this.optionsTemp = [];
      this.options = this.optionsSlice.slice();

      let j = 0;

      if(!value)
      {
        this.options = this.optionsSlice;
      } 
      else 
      {
        for(var i=0; i<this.options.length; i++) // go through options
        {
          if (this.options[i].toLowerCase().startsWith(value.toLowerCase())) // if an option starts with whats typed in (converted to lower case)
          {
            this.optionsTemp[j] = this.options[i]; // add it to the temp array's first value
            j++;
          }
        }
        this.options = this.optionsTemp.slice();
      }
    });
  }



  onLogout()
  {
    this.authService.logout();
  }
  
  /* RECIPE ADDING MODAL FUNCTIONS */
  open(content) 
  {
    this.modalRef = this.modalService.open(content);

    // reset & clear everything when modal opens
    this.submitClicked = false;
    this.recipeAddFormGroup.get('recipeNameCtrl').reset(null);
    this.recipeAddFormGroup.get('recipeDescriptionCtrl').reset(null);
    this.recipeAddFormGroup.get('recipeImageUrlCtrl').reset(null);
    this.recipeAddFormGroup.get('anIngredientCtrl').reset(null);
    this.recipeAddFormGroup.get('anIngredientAmountCtrl').reset(null);

    this.recipeIngredientsArr = [];
    this.recipeComments = [""];
    this.formImageSource = null;
  }


  addIngredient()
  {
    this.recipeIngredient = this.recipeAddFormGroup.get('anIngredientCtrl').value;
    this.recipeIngredientAmount = this.recipeAddFormGroup.get('anIngredientAmountCtrl').value;

    this.recipeIngredientsArr.push({name:this.recipeIngredient, amount:this.recipeIngredientAmount});
  }

  
  onRecipeSubmit()
  {
    this.submitClicked = true;

    if(this.recipeAddFormGroup.valid) // if no error in form
    {
      this.recipeName = this.recipeAddFormGroup.get('recipeNameCtrl').value;
      this.recipeDescription = this.recipeAddFormGroup.get('recipeDescriptionCtrl').value;
      this.recipeImageUrl = this.recipeAddFormGroup.get('recipeImageUrlCtrl').value;

      this.authService.getAuth().subscribe(authState => {
        
        let mockRecipe = {
          RID: authState.uid,
          name: this.recipeName,
          makerName: authState.displayName,
          description: this.recipeDescription,
          imagesrc: this.recipeImageUrl,
          comments: this.recipeComments,
          recipeIngredients: this.recipeIngredientsArr,
          upvotes: 0,
          upvoted: false
        }
    
        this.recipesDataService.addRecipe(mockRecipe);

      });
    }

    if(this.recipeAddFormGroup.valid) // if no error in form
    {
      this.modalRef.close(); // close the modal    
    } 
    
  }


  onImageUrlError() { this.imageUrlError = true; }
  onNoImageUrlError(){this.imageUrlError = false;}


  /*
  middleEventsCounter: number = 0;
  atTheTop: boolean = true;

  
  public handleScroll(event: ScrollEvent) 
  {
    if (event.isReachingBottom) 
    {
      console.log(`AT THE BOTTOM`);
      this.middleEventsCounter = 0;
    }

    if (event.isReachingTop) 
    {
      this.atTheTop = true; //true after a single event of at top (isReachingTop)
      this.middleEventsCounter = 0;
    }

    if (event.isWindowEvent) 
    {
      this.middleEventsCounter = this.middleEventsCounter + 1;

      if (this.middleEventsCounter > 36)
      {
        this.middleEventsCounter = 0;
        this.atTheTop = false; // false only after 10 events of in middle (isWindowEvent)
      } 
    }

    if(this.atTheTop)
    {
      //transparent
      this.navState = "navbar sticky-top navbar-expand-lg navbar-dark bg-dark";
    } else { // if atTheTop is false
      //not transparent
      this.navState = "navbar sticky-top navbar-expand-lg navbar-dark bg-dark";
    }
  }
  */

}
