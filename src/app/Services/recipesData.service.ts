import { AuthService } from './auth.service';
import { Recipe } from './../models/Recipe';
import { Observable } from 'rxjs/Observable';
import { Injectable, AnimationKeyframe, OnInit } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabase , AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AnonymousSubject } from 'rxjs/Subject';
import { OnDestroy } from "@angular/core";
import 'rxjs/add/operator/takeUntil';
import { Subject }  from 'rxjs/Subject';

@Injectable()
export class RecipesDataService implements OnDestroy
{
   public recipeReturned: Recipe[];
   selected: Recipe;
   valObj: Recipe[];
   private ngUnsubscribe: Subject<any> = new Subject();
   message:string;

   constructor(public ngFireDB: AngularFireDatabase, public authService: AuthService) 
   { }


   getRecipes(start, end): any
   {
      /*
      let recipesList = this.ngFireDB.list('/recipes', ref => ref.orderByChild('name').limitToFirst(10).startAt(start).endAt(end));
      
      return recipesList.snapshotChanges().map(actions => {
         return actions.map(action => ({ key: action.key, ...action.payload.val() }));
      });*/

      start.map(val => {
         console.log(val);
      })

   }


   getDbUserByName(name: string)
   { 
      let usersList = this.ngFireDB.list<any>('/users', ref => ref.orderByChild('userName').equalTo(name));
      
      return usersList.snapshotChanges().map(actions => {
         return actions.map(action => ({ key: action.key, ...action.payload.val() }));
      }).takeUntil(this.ngUnsubscribe)
   }


   getDbRecipeByName(name: string)
   { 
      let recipesList = this.ngFireDB.list<any>('/recipes', ref => ref.orderByChild('name').equalTo(name));
   
      return recipesList.snapshotChanges().map(actions => {
         return actions.map(action => ({ key: action.key, ...action.payload.val() }));
      }).takeUntil(this.ngUnsubscribe)
   }


   getDbListObject(dbList: any)
   {
      return dbList.snapshotChanges().map(actions => {
         return actions.map(action => ({ key: action.key, ...action.payload.val() }));
      }).takeUntil(this.ngUnsubscribe)
   }


   addUser(user: any)
   {
      let userList = this.ngFireDB.list<any>('/users').push(user);
   }


   addRecipe(recipe: any)
   {
      this.ngFireDB.list<any>('/recipes').push(recipe);
   }


   deleteRecipe(recipe: any)
   {
      let recipeList = this.ngFireDB.list<any>('/recipes', ref => ref.orderByChild('name').equalTo(recipe.name));

      this.getDbListObject(recipeList).subscribe(recipes => {
         recipeList.remove(recipes[0].key);
      });
   }
   

   getRecipesChanges()
   {
      return this.ngFireDB.list<Recipe>('/recipes').valueChanges();
   }


   getRecipeObservable()
   {
      return this.ngFireDB.list<Recipe>('/recipes').valueChanges();
   }


   ngOnDestroy() 
   {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
   }
}