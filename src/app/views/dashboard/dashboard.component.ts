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
    return this.recipes
  }

  getLastRecipe(): Recipe {
    if (this.recipes.length > 0) {
      return this.recipes[-1]
    }
    return this.recipes[-1]
  }
  getAllButLastRecipes():Recipe[] | void {
    let n = this.recipes.length
    if (n > 0) {
      return this.recipes.slice(0, -1)
    }
  }
}
