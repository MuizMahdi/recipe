import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { RecipesDataService } from './../../Services/recipesData.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from './../../Services/auth.service';
import { ISubscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit 
{
  authSubscription: ISubscription;
  notificationStatusSubscription: ISubscription;
  getDbUserSubscription: ISubscription;

  optionsSlice: string[] = [];
  optionsTemp: string[] = [];
  options: string[] = [];

  showRecipeModal: boolean = false;
  navInputFocused: boolean = false;
  isLoggedIn: boolean = false;
  userNotificationState:boolean;

  loggedInUserEmail:string;
  loggedInUserName: string; 
  formGroup: FormGroup;

  constructor(
    private recipesDataService: RecipesDataService,
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router) 
  { 
    this.buildForm();
    //this.getRecipesNames();
    //this.checkFormCtrlChanges();
  }

  ngOnInit()
  {
    this.authService.getAuth().subscribe(auth => {
      if(auth)
      {
        //this.unsubscribeAll();
        
        this.isLoggedIn = true;
        this.loggedInUserEmail = auth.email;

        this.notificationStatusSubscription = this.recipesDataService.getDbUserByName(auth.displayName).subscribe(users => {
          return users.map(user => {
            this.userNotificationState = user.notificationState;
          });
        });

      }
      else
      {
        this.isLoggedIn = false;
      }
    });
  }

  modal()
  {
    this.showRecipeModal = true;
  }

  getModalState(event: boolean)
  {
    if(event) {
      this.showRecipeModal = false;
    } 
    else {
      this.showRecipeModal = true;
    }
  }

  buildForm()
  {
    this.formGroup = this.formBuilder.group({
      formCtrl: ['', Validators.required]
    });
  }
  
  /*getRecipesNames()
  {
    for(let i=0; i<this.dataService.getRecipes().length; i++)
    {
      this.options[i] = this.dataService.getRecipes()[i].name;
    }
    this.optionsSlice = this.options.slice();
  }*/

  /*onSearch()
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
  }*/

  /*checkFormCtrlChanges()
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
  }*/

  onLogout()
  {
    this.authService.logout();
  }
  
  onNavInputFocus()
  {
    this.navInputFocused = true;
  }

  onNavInputBlur()
  {
    this.navInputFocused = false;
  }

  redirectToProfile()
  {
    this.authSubscription = this.authService.getAuth().subscribe(authState => {
      let authUser = authState.displayName;
      this.router.navigate(['/profile/' + authUser]);
    });
  }

  userNotifications: any[] = [];
  getUserNotifications()
  {
    this.unsubscribeAll();

    this.authService.getAuth().subscribe(authState => {
      this.getDbUserSubscription = this.recipesDataService.getDbUserByName(authState.displayName).subscribe(users => {
        return users.map(user => {

          this.userNotifications = user.notifications;

          for(let i=0; i<=user.notifications.length-1; i++)
          {
            if(i==10) break;

            let string = this.userNotifications[i];
            let splitArray = string.split(" has ");
            
            if(splitArray[0] !== "")
            {
              let notifierVal:string =  splitArray[0];
              let theNotificationVal:string = splitArray[1];
              
              this.userNotifications[i] = {notifier: notifierVal, theNotification: theNotificationVal};
            }
            
          }

          if(this.userNotifications[this.userNotifications.length-1] === "")
          {
            this.userNotifications.pop();
          }

          this.changeMakerNotificationState(authState.displayName);

        });
      });
    });
  }

  changeMakerNotificationState(makerName:string)
  {
    this.recipesDataService.setUserNotificationState(makerName, false);
  }

  unsubscribeAll()
  {
    if(typeof this.authSubscription != 'undefined')
    {
      this.authSubscription.unsubscribe();
    }
    if(typeof this.notificationStatusSubscription != 'undefined')
    {
      this.notificationStatusSubscription.unsubscribe();
    }
    if(typeof this.getDbUserSubscription != 'undefined')
    {
      this.getDbUserSubscription.unsubscribe();
    }
  }

  ngOnDestroy()
  {
    this.unsubscribeAll();
  }
}