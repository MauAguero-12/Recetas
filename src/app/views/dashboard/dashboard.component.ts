import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  // Atributes
  recipes: Recipe[] = []

  // Basic Methods
  constructor(private router: Router, private recipeService: RecipesService) { }

  ngOnInit(): void {
    // get recipes from service
    this.recipes = this.recipeService.getRecipes()
  }

  ngAfterViewInit(): void {
    // add click event to recipe cards
    let recipeCards = document.getElementsByClassName('recipeCards')
    let n = recipeCards.length
    for (let i = 0; i < n; i++) {
      let card = recipeCards[i] as HTMLElement
      if (card) {
        card.onclick = () => {
          let recipeIndex = n - 1 - i
          this.recipeService.setSelectedRecipe(recipeIndex)
          this.router.navigateByUrl('view')
        }
      }
    }
  }

  // Get Recipe
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
    }
    return array.reverse()
  }

  // Cards
  getCardId(i: number): string {
    let idString = 'recipeCard'
    if (i < this.recipes.length - 1) {
      return idString + i
    }
    return ''
  }
}
