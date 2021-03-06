import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Component, OnInit, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { RecipesDataService } from './../../Services/recipesData.service';
import { AuthService } from './../../Services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ISubscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit 
{
  @Output() RecipeEmitter: EventEmitter<any> = new EventEmitter<any>();

  NotificationRecipeEmitSubscription: ISubscription;
  notificationStatusSubscription: ISubscription;
  NotificationStateSubscription: ISubscription;
  getDbUserSubscription: ISubscription;
  authSubscription: ISubscription;

  userNotifications: any[] = [];
  optionsSlice: string[] = [];
  optionsTemp: string[] = [];
  options: string[] = [];
  searchedRecipes: any[];

  showRecipeModal: boolean = false;
  navInputFocused: boolean = false;
  userNotificationState:boolean;
  isLoggedIn: boolean = false;

  floatingButtonDirection: string;
  floatingButtonIcon: string;
  lastSearchKeypress: number = 0;
  loggedInUserEmail: string;
  loggedInUserName: string; 
  emittedRecipe:any;

  searchInput = new Subject();
  searchFormGroup: FormGroup;
  
  constructor(
    private recipesDataService: RecipesDataService,
    private ngFireDB: AngularFireDatabase,
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
    this.getUserAuthenticationAndEmail();
    this.getSearchedRecipe();
    this.getUserPlatform();
  }

  getUserPlatform()
  {
    let isMobile:boolean = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);

    if(isMobile) {
      this.floatingButtonDirection = "top";
      this.floatingButtonIcon = "expand_less";
    }
    else {
      this.floatingButtonDirection = "bottom";
      this.floatingButtonIcon = "expand_more";
    }
  }

  getUserAuthenticationAndEmail()
  {
    this.authService.getAuth().subscribe(auth => {
      if(auth)
      {
        this.isLoggedIn = true;
        this.loggedInUserEmail = auth.email;

        this.getUserNotificationState(auth.displayName);
      }
      else
      {
        this.isLoggedIn = false;
      }
    });
  }

  getUserNotificationState(userName:string)
  {
    this.notificationStatusSubscription = this.recipesDataService.getDbUserByName(userName).subscribe(users => {
      return users.map(user => {
        this.userNotificationState = user.notificationState;
      });
    });
  }

  getSearchedRecipe()
  {
    this.searchInput.subscribe(val => {
      
      let start = val[0];
      let end = val[1];

      let recipesList = this.ngFireDB.list('/recipes', ref => ref.orderByChild('name').limitToFirst(10).startAt(start).endAt(end));

      this.recipesDataService.getDbListObject(recipesList).subscribe(recipes => {
        this.searchedRecipes = recipes;
        this.emittedRecipe = Object.assign({}, recipes[0]);
      });

    });
  }

  getKeystrokes($event)
  {
    if($event.timeStamp - this.lastSearchKeypress > 100)
    {
      let q = $event.target.value.toLowerCase();
      this.searchInput.next([q,(q+"\uf8ff")]);
    }
    this.lastSearchKeypress = $event.timeStamp;
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
    this.searchFormGroup = this.formBuilder.group({
      searchCtrl: ['', Validators.required]
    });
  }

  onSearch()
  {
    let recipeName = this.searchFormGroup.get('searchCtrl').value;

    if(recipeName.trim().length > 0)
    {
      recipeName = recipeName.trim();
      this.RecipeEmitter.emit(this.emittedRecipe);
    }
  }

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
              let recipe:string = theNotificationVal.split(' recipe')[0].split('your ')[1];
              
              this.userNotifications[i] = {notifier: notifierVal, theNotification: theNotificationVal, theRecipe: recipe};
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

  emitNotificationRecipe(recipeName:string)
  {
    this.unsubscribeAll();

    let recipeList = this.ngFireDB.list<any>('/recipes', ref => ref.orderByChild('name').equalTo(recipeName));
    let notificationRecipeObject:any;

    this.NotificationRecipeEmitSubscription = this.recipesDataService.getDbListObject(recipeList).subscribe(recipes => {
      notificationRecipeObject = Object.assign({}, recipes[0]);
      this.RecipeEmitter.emit(notificationRecipeObject);
    });
     
  }

  changeMakerNotificationState(makerName:string)
  {
    this.unsubscribeAll();
  
    let usersList = this.ngFireDB.list<any>('/users', ref => ref.orderByChild('userName').equalTo(makerName));

    this.NotificationStateSubscription = this.recipesDataService.getDbListObject(usersList).subscribe(users => {
      usersList.update(users[0].key, {notificationState: false});
    });
  }

  unsubscribeAll()
  {
    if(typeof this.authSubscription != 'undefined')
    {
      this.authSubscription.unsubscribe();
    }
    if(typeof this.getDbUserSubscription != 'undefined')
    {
      this.getDbUserSubscription.unsubscribe();
    }
    if(typeof this.NotificationStateSubscription != 'undefined')
    {
      this.NotificationStateSubscription.unsubscribe();
    }
    if(typeof this.NotificationRecipeEmitSubscription != 'undefined')
    {
      this.NotificationRecipeEmitSubscription.unsubscribe();
    }
  }

  ngOnDestroy()
  {
    this.unsubscribeAll();
  }
}