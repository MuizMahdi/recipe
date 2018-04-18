import { RecipesComponent } from './../recipes/recipes.component';
import { ARecipe } from './../../models/ARecipe';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { ScrollEvent } from 'ngx-scroll-event';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../Services/auth.service';

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


  options: string[] = [];
  optionsSlice: string[] = [];
  optionsTemp: string[] = [];
  recipes: ARecipe[] = this.dataService.getRecipes();
  isLoggedIn: boolean;
  loggedInUserEmail:string;
  loggedInUserName: string;


  constructor(public dataService: DataService, private formBuilder: FormBuilder, private router: Router, private authService: AuthService) 
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

  buildForm()
  {
    this.formGroup = this.formBuilder.group({
      formCtrl: ['', Validators.required]
    });
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


  onLogout()
  {
    this.authService.logout();
  }
  

}
