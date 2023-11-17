import { Injectable } from '@angular/core';
import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  // Atributes
  recipes: Recipe[] = this.get_localstorage_recipes()

  // Methods
  getRecipes(): Recipe[] {
    this.recipes = this.get_localstorage_recipes()
    return this.recipes
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.add_localstorage_recipe(recipe)
  }

  setSelectedRecipe(recipe: Recipe): void {
    if (this.recipes.indexOf(recipe) != -1) {
      localStorage.setItem('currentRecipe', JSON.stringify(recipe))
    }
  }

  getSelectedRecipe(): Recipe | void {
    let recipe_str: string | null = localStorage.getItem('currentRecipe')
    if (recipe_str != null && recipe_str != '') {
      let recipe: Recipe = JSON.parse(recipe_str)
      return recipe
    }
  }

  deleteRecipes(): void {
    this.recipes = []

    // currently commented so the recipes aren't completely lost after deleting
    // this.clear_localstorage_recipes()
  }

  // Local Storage
  private count_localstorage_recipes(): number {
    let i: number = 0
    let recipe: string | null = localStorage.getItem('recipe' + 0)
    while (recipe != null && recipe != '') {
      i++
      recipe = localStorage.getItem('recipe' + i)
    }
    return i
  }

  private get_localstorage_recipes(): Recipe[] {
    let recipes_array: Recipe[] = []
    for (let i = 0; i < this.count_localstorage_recipes(); i++) {
      let recipe: string | null = localStorage.getItem('recipe' + i)
      if (recipe != null && recipe != '') {
        let recipe_info: Recipe = JSON.parse(recipe)
        recipes_array.push(recipe_info)
      }
    }
    return recipes_array
  }

  private add_localstorage_recipe(recipe: Recipe) {
    let recipeString: string = JSON.stringify(recipe)
    let recipesCount: number = this.count_localstorage_recipes()
    localStorage.setItem('recipe' + recipesCount, recipeString)
  }

  private clear_localstorage_recipes() {
    localStorage.removeItem('currentRecipe')
    for (let i = 0; i < this.count_localstorage_recipes(); i++) {
      localStorage.removeItem('recipe' + i)
    }
  }
}
