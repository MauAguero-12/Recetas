import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // ATRIBUTES
  recipes: Recipe[] = []

  // METHODS
  constructor(private recipeService: RecipesService) {

  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes()
  }

  getAllRecipes(): Recipe[] {
    let recipesList = this.recipes
    return recipesList
  }

  getAllRecipesReverse(): Recipe[] {
    let reversedRecipes = this.recipes.slice()
    return reversedRecipes.reverse()
  }

  getNewestRecipe(): Recipe[] {
    if (this.recipes.length > 0) {
      return this.recipes.slice(-1)
    }
    return []
  }
  getOtherRecipes(): Recipe[] {
    let n = this.recipes.length
    let array: Recipe[] = []
    if (n > 0) {
      array = this.recipes.slice(0, -1)
      while ((n - 1) % 3 != 0) {
        let dummy: Recipe = { title: '', description: '', image: '', ingredients: [] }
        array.unshift(dummy)
        n++;
      }
    }
    return array
  }
}
