import { Router } from '@angular/router';
import { an_Ingredient } from './../../Models/an_Ingredient';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../Services/data.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit 
{

  closeResult: string;


  formName: string;
  formDescription: string;
  formImageSource: string;

  Ingredients: an_Ingredient[];
  formIngredientName: string;
  formIngredientAmount: number;

  ingredientsNames: string[];
  ingredientsAmounts: number[];

  imageUrlError: boolean = false;
  formValid: boolean = true;
  

  constructor(private modalService: NgbModal, public dataService: DataService, private router: Router) { }

  private modalRef: NgbModalRef;

  open(content) 
  {
    this.modalRef = this.modalService.open(content);

    // clear everything when modal opens
    this.formName = "";
    this.formDescription = "";
    this.formImageSource = "";
    this.imageUrlError = false;
    this.formValid = true;

    this.formIngredientName = "";
    this.formIngredientAmount = 0;

    this.ingredientsNames = [];
    this.ingredientsAmounts = [];
    this.Ingredients = [];
  }

  
  ngOnInit() { }


  submitRecipe()
  {
    this.dataService.addRecipe({name: this.formName, description: this.formDescription, imagesrc: this.formImageSource, upvotes:0, ingredients: this.ingredientsNames, amounts: this.ingredientsAmounts, upvoted: false, comments: []});
    this.dataService.addMyRecipe({name: this.formName, description: this.formDescription, imagesrc: this.formImageSource, upvotes:0, ingredients: this.ingredientsNames, amounts: this.ingredientsAmounts, upvoted: false, comments: []});

    /*// clear the values after submitting
    this.formName = "";
    this.formDescription = "";
    this.formImageSource = "";*/
  }


  addIngredient()
  {
    // push the name and amount from the forms into an array of objects: {name,amount}
    this.Ingredients.push({name: this.formIngredientName, amount: this.formIngredientAmount});
    
    // add IngredientName to array for addRecipe() in dataService.
    this.ingredientsNames.push(this.formIngredientName);
    this.ingredientsAmounts.push(this.formIngredientAmount);
  }


  
  updateUrl() // on Image URL Error (image not loaded using the given url source)
  {
    this.imageUrlError = true;
  }

  onNoImageUrlError()
  {
    this.imageUrlError = false;
  }



  onSubmit({value, valid})
  {
    if(valid) // if no error in form
    {
      this.modalRef.close(); // close the modal    
      this.submitRecipe();
      this.formValid = true; 
    } 
    else 
    {
      this.formValid = false; // view message if form is invalid (one or more fields incorrect)
    }
  }

  onHeaderButtonClick()
  {
    this.router.navigate(['/login']);
  }

}
