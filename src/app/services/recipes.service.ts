import { Injectable, OnInit } from '@angular/core';
import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  constructor() { }

  // Session Storage (CAMBIAR)
  useSessionStorage: boolean = true
  private count_session_recipes(): number {
    let i: number = 0
    let recipe: string | null = sessionStorage.getItem('recipe' + 0)
    while (recipe != null && recipe != '') {
      i++
      recipe = sessionStorage.getItem('recipe' + i)
    }
    return i
  }
  private get_session_recipes(): Recipe[] {
    let recipes_array: Recipe[] = []
    let i: number = 0
    while (i < this.count_session_recipes()) {
      let recipe: string | null = sessionStorage.getItem('recipe' + i)
      if (recipe != null && recipe != '') {
        let recipe_info: Recipe = JSON.parse(recipe)
        recipes_array.push(recipe_info)
        i++
      }
    }
    return recipes_array
  }
  private add_session_recipe(user: Recipe) {
    let userString: string = JSON.stringify(user)
    let cardCount: number = this.count_session_recipes()
    sessionStorage.setItem('recipe' + cardCount, userString)
  }

  // Atributes
  recipes: Recipe[] = this.get_session_recipes()
  selectedRecipe: number = -1

  // Methods
  getRecipes(): Recipe[] {
    return this.recipes
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    if (this.useSessionStorage) {
      this.add_session_recipe(recipe)
    }
  }

  setSelectedRecipe(i: number): void {
    this.selectedRecipe = i
  }
  getSelectedRecipe(): Recipe | void {
    if (this.selectedRecipe > -1 && this.selectedRecipe < this.recipes.length) {
      return this.recipes[this.selectedRecipe]
    }
  }
}
