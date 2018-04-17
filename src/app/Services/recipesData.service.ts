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

  updateRecipe(recipe: Recipe)
  {
    let recipeList = this.ngFireDB.list<Recipe>('/recipes', ref => ref.orderByChild('name').equalTo(recipe.name));
    
    let recipeSubscription = recipeList.snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).takeUntil(this.ngUnsubscribe).subscribe(items => {
      return items.map(item => {
        recipeList.update(item.key, {
          name: item.name,
          description: item.description,
          imagesrc: item.imagesrc,
          upvotes: item.upvotes+1,
          upvoted: true, // Each account should be able to apvote separatedly, so basicly it should be false by default for each account.
          ingredientsNames: item.ingredientsNames,
          ingredientsAmounts: item.ingredientsAmounts,
          comments:item.comments
        });
      });
    });  

    // Memory Leak when upvoting twice, so no upvoting twice... ITS A FEATURE !
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