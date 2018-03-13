import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { ARecipe } from '../../Models/ARecipe';
import { DataService } from '../../Services/data.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-my-recipe-detail',
  templateUrl: './my-recipe-detail.component.html',
  styleUrls: ['./my-recipe-detail.component.css']
})


export class MyRecipeDetailComponent implements OnInit 
{


/*******************************************************************************************/

  @Input() aSelectedMyRecipe: ARecipe;
  changeDetect: ARecipe;

  recipeName: string;
  recipeImageSource: string;
  recipeDescription: string;


  closeResult: string;

  formName: string;
  formDescription: string;
  formImageSource: string;
/*******************************************************************************************/



/*******************************************************************************************/

  ngOnChanges(changes: SimpleChanges) 
  {
    for (let propName in changes) 
    {
      let chng = changes[propName];
      this.changeDetect = chng.currentValue;                 // RETURNS THE OBJECT IT SELF
    }
      
    this.recipeName = this.changeDetect.name;
    this.recipeImageSource = this.changeDetect.imagesrc;
    this.recipeDescription = this.changeDetect.description;
    
  }

/*******************************************************************************************/



/*******************************************************************************************/

  constructor(public dataService: DataService, private modalService: NgbModal) { }

  ngOnInit() { }

/*******************************************************************************************/



/*******************************************************************************************/
  
  open(content) 
  {
    this.modalService.open(content);

    // clear the forms when modal opens
    this.formName = "";
    this.formDescription = "";
    this.formImageSource = "";
  }

  //////////////////////////////////////////////////////////////////////

  editingData: ARecipe;

  editRecipe()
  {
    for (let myRecipe of this.dataService.getMyRecipes())
    {
      if(myRecipe.name == this.recipeName) //find the name of the recipe being edited on the data service
      {
        this.editingData = {name:this.formName, description:this.formDescription, imagesrc:this.formImageSource}

        // send the data to be edited to edit myRecipe in the data service :-
        this.dataService.editRecipe(myRecipe, this.editingData);
        
        // change values in the viewed detail too !
        this.recipeName = this.formName;
        this.recipeDescription = this.formDescription;
        this.recipeImageSource = this.formImageSource;
      }
    }

    //this.dataService.addRecipe({name:this.formName, description:this.formDescription, imagesrc:this.formImageSource});
    //this.dataService.addMyRecipe({name:this.formName, description:this.formDescription, imagesrc:this.formImageSource});

    /*// clear the values after submitting
    this.formName = "";
    this.formDescription = "";
    this.formImageSource = "";*/
  }

/*******************************************************************************************/



}
