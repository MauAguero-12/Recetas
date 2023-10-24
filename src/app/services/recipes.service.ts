import { Injectable } from '@angular/core';
import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  constructor() { }

  recipes: Recipe[] = []

  getRecipes(): Recipe[]{
    return this.recipes
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe)
  }
}
