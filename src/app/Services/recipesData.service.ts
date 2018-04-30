import { Recipe } from './../models/Recipe';
import { Observable } from 'rxjs/Observable';
import { Injectable, AnimationKeyframe } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabase , AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AnonymousSubject } from 'rxjs/Subject';
import { OnDestroy } from "@angular/core";
import 'rxjs/add/operator/takeUntil';
import { Subject }  from 'rxjs/Subject';
import { Action } from 'rxjs/scheduler/Action';

@Injectable()
export class RecipesDataService implements OnDestroy
{
/*******************************************************************************************/

  public recipeReturned: Recipe[];
  selected: Recipe;
  valObj: Recipe[];
  private ngUnsubscribe: Subject<any> = new Subject();

/*******************************************************************************************/


/*******************************************************************************************/

  constructor(public ngFireDB: AngularFireDatabase) { }

/*******************************************************************************************/


/*******************************************************************************************/

  ngOnDestroy() 
  {
    // Unsubscribe just in case, for safety
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

/*******************************************************************************************/

/*******************************************************************************************/

  upvoteRecipe(recipe: Recipe)
  {
    let recipeList = this.ngFireDB.list<Recipe>('/recipes', ref => ref.orderByChild('name').equalTo(recipe.name));
    
    let recipeSubscription = recipeList.snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).takeUntil(this.ngUnsubscribe).subscribe(recipes => {
      return recipes.map(recipe => {

        recipeList.update(recipe.key, {
          RID: recipe.RID,
          name: recipe.name,
          makerName: recipe.makerName,
          description: recipe.description,
          imagesrc: recipe.imagesrc,
          upvotes: recipe.upvotes+1,
          upvoted: true, // Each account should be able to apvote separatedly, so basicly it should be false by default for each account.
          recipeIngredients: recipe.recipeIngredients,
          comments: recipe.comments
        });

      });
    });  

    // Memory Leak when upvoting twice, so no upvoting twice... ITS A FEATURE !
  }

/*******************************************************************************************/


/*******************************************************************************************/

  // find user in database and return an object so then it can be updates using 'usersList.update(user.key, {other parameters/keys})' used on login component
  getDbUserByName(name: string)
  { 
    let usersList = this.ngFireDB.list<any>('/users', ref => ref.orderByChild('userName').equalTo(name));
    
    return usersList.snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).takeUntil(this.ngUnsubscribe)
  }

/*******************************************************************************************/


/*******************************************************************************************/

  getDbRecipeByName(name: string)
  { 
    let recipesList = this.ngFireDB.list<any>('/recipes', ref => ref.orderByChild('userName').equalTo(name));
 
    return usersList.snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).takeUntil(this.ngUnsubscribe)
  }

/*******************************************************************************************/


/*******************************************************************************************/

  getDbListObject(dbList: any)
  {
    return dbList.snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).takeUntil(this.ngUnsubscribe)
  }

/*******************************************************************************************/


/*******************************************************************************************/

  addUser(user: any)
  {
    let userList = this.ngFireDB.list<any>('/users').push(user);
  }

/*******************************************************************************************/


/*******************************************************************************************/

  addRecipe(recipe: any)
  {
    this.ngFireDB.list<any>('/recipes').push(recipe);
  }

/*******************************************************************************************/


/*******************************************************************************************/

  getRecipesChanges()
  {
    return this.ngFireDB.list<Recipe>('/recipes').valueChanges();
  }

/*******************************************************************************************/


/*******************************************************************************************/

  getRecipeObservable()
  {
    return this.ngFireDB.list<Recipe>('/recipes').valueChanges();
  }

/*******************************************************************************************/


/*******************************************************************************************/

  /*selectedRecipe(theRecipe: Recipe)
  {
    this.selected = theRecipe;
  }

  getSelectedRecipe(): ARecipe
  {
    return this.selected;
  }*/

/*******************************************************************************************/



/****** ~ NOTE ~ *******************************************************************************/ 
  /*
    Insert in component onInit() to access DB data:

    this.recipeDataService.getRecipesDbChanges().subscribe( recipes => {
      this.recipesFromDB = recipes; // subscribe when data is needed else where.
    });

    this.recipesDbObservable = this.recipeDataService.getRecipesDbChanges(); // async to observable when data only needed on template.
  */
/*******************************************************************************************/

}