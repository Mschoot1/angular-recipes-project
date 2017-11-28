import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import {Subject} from 'rxjs/Subject';

import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {environment} from '../../environments/environment';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private headers = new Headers({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl + '/recipes'; // URL to web api
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService, private http: Http) {
  }

  // getRecipes() {
  //   return this.recipes.slice();
  // }

  public getRecipes(): Promise<Recipe[]> {
    console.log('items ophalen van server');
    return this.http.get(this.serverUrl, {headers: this.headers})
      .toPromise()
      .then(response => {
        console.dir(response.json());
        return response.json() as Recipe[];
      })
      .catch(error => {
        console.log('handleError');
        return Promise.reject(error.message || error);
      });
  }

  public getRecipe(_id: string): Promise<Recipe> {
    return this.http.get(this.serverUrl + '/' + _id, {headers: this.headers})
      .toPromise()
      .then(response => {
        console.dir(response.json());
        return response.json() as Recipe;
      })
      .catch(error => {
        console.log('handleError');
        return Promise.reject(error.message || error);
      });
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(_id: Recipe) {
    this.recipes.push(_id);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(_id: string, newRecipe: Recipe) {
    this.recipes[_id] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(_id: string) {
    // this.recipes.splice(_id, 1);
    // this.recipesChanged.next(this.recipes.slice());
  }
}
