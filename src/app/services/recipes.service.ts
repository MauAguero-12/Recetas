import { Injectable } from '@angular/core';
import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  // Atributes
  recipes: Recipe[] = this.get_localstorage_recipes()
  selectedRecipe: Recipe | null = null

  // Methods
  getRecipes(): Recipe[] {
    return this.recipes
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    // this.add_localstorage_recipe(recipe)
  }

  setSelectedRecipe(recipe: Recipe): void {
    if (this.recipes.indexOf(recipe) != -1) {
      this.selectedRecipe = recipe
    }
  }
  getSelectedRecipe(): Recipe | void {
    if (this.selectedRecipe) {
      return this.selectedRecipe
    }
  }

  deleteRecipes(): void {
    this.recipes = []
    this.selectedRecipe = null
    // localStorage.clear()
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
    let i: number = 0
    while (i < this.count_localstorage_recipes()) {
      let recipe: string | null = localStorage.getItem('recipe' + i)
      if (recipe != null && recipe != '') {
        let recipe_info: Recipe = JSON.parse(recipe)
        recipes_array.push(recipe_info)
        i++
      }
    }
    return recipes_array
  }

  private add_localstorage_recipe(recipe: Recipe) {
    let recipeString: string = JSON.stringify(recipe)
    let recipesCount: number = this.count_localstorage_recipes()
    localStorage.setItem('recipe' + recipesCount, recipeString)
  }
}
