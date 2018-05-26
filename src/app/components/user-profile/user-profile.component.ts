import { AuthService } from './../../Services/auth.service';
import { Subject } from 'rxjs/Subject';
import { Recipe } from './../../models/Recipe';
import { AngularFireDatabase } from 'angularfire2/database';
import { RecipesDataService } from './../../Services/recipesData.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit 
{

  profileUsername: string;
  userName: string;
  userDetails: string;
  userProfileImageSource: string;
  userID: string;
  userRecipes: any[] = [];
  selectedRecipeImg: string = "";
  theSelectedDaRecipe: Recipe;
  private modalRef: NgbModalRef;

  ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private authService: AuthService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private recipeDataService: RecipesDataService, 
    private ngFireDB: AngularFireDatabase, 
    private modalService: NgbModal) 
  { 
    this.getRoutingParameters();
  }

  open(content) 
  {
    this.modalRef = this.modalService.open(content, {size: 'lg'});
  }

  getRoutingParameters()
  {
    this.route.params.subscribe(params => {
      this.profileUsername = params.userName;
      this.getUser();
    });
  }


  getUser2()
  {
    this.recipeDataService.getDbUserByName(this.profileUsername).takeUntil(this.ngUnsubscribe).subscribe(users => {
      return users.map(user => {

        this.userName = user.userName;
        this.userDetails = user.aboutUser;
        this.userProfileImageSource = user.photoUrl;
        this.userID = user.uid;

        this.getUserRecipes(this.userID);
      })
    });
  }


  getUser()
  {
    let usersList = this.ngFireDB.list<any>('/users', ref => ref.orderByChild('userName').equalTo(this.profileUsername));
    
    return usersList.snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).subscribe(users => {
      return users.map(user => {


        this.userName = user.userName;
        this.userDetails = user.aboutUser;
        this.userProfileImageSource = user.photoUrl;
        this.userID = user.uid;
        console.log("getDbUser: " + this.userName);
        this.getUserRecipes(this.userID);
      });
    });
  }

  
  getUserRecipes(uid: any)
  {
    let recipesList = this.ngFireDB.list<any>('/recipes', ref => ref.orderByChild('RID').equalTo(uid));

    return recipesList.snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).takeUntil(this.ngUnsubscribe).subscribe(recipes => {
      this.userRecipes = recipes;
    });
  }


  setSelected2(selectedDaRecipe: Recipe)
  {
    this.theSelectedDaRecipe = selectedDaRecipe;
    this.selectedRecipeImg = this.theSelectedDaRecipe.imagesrc;
  }


  ngOnInit() 
  { }

  ngOnDestroy() 
  {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
