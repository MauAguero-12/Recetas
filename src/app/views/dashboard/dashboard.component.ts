import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
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
  searchFilter: string = ''

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

  getLastRecipe(): Recipe[] {
    if (this.recipes.length > 0) {
      return this.recipes.slice(-1)
    }
    return []
  }

  getFilteredRecipes(): Recipe[] {
    let n = this.recipes.length
    let array: Recipe[] = []
    let arrayFiltered: Recipe[] = []
    if (n > 1) {
      // remove last recipe
      array = this.recipes.slice(0, -1)

      // if theres a filter
      if (this.searchFilter != '') {
        let filter = this.searchFilter.toLowerCase()
        // for each recipe apply filter
        for (let i = 0; i < array.length; i++) {
          let recipe: Recipe = array[i]
          let recipeTitle = recipe.title.toLowerCase()
          if (recipeTitle.includes(filter)) {
            arrayFiltered.push(recipe)
          }
        }
      } else {
        arrayFiltered = array
      }
    }
    return arrayFiltered.reverse()
  }

  // Filter By Name
  updateFilter(event: any) {
    this.searchFilter = event.target.value
    console.log(event.target.value)
  }

  // Cards
  getCardId(i: number): string {
    let idString = 'recipeCard'
    if (i < this.recipes.length - 1) {
      return idString + i
    }
    return ''
  }

  // Icons
  iconSearch = faMagnifyingGlass
}
