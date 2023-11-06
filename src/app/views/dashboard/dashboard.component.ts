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
  recipes: Recipe[] = [];
  recipesFiltered: Recipe[] = [];
  searchFilter: string = '';
  currentPage = 1;
  recipesPerPage = 12;


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

  getFilteredRecipes(): void {
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

    // get current page
    let nFiltered: number = arrayFiltered.length
    let start: number = nFiltered - this.recipesPerPage * this.currentPage
    let end: number = start + this.recipesPerPage
    if (start < 0) {
      start = 0
    }

    if (end >= nFiltered) {
      arrayFiltered = arrayFiltered.slice(start)
    } else {
      arrayFiltered = arrayFiltered.slice(start, end)
    }

    this.recipesFiltered = arrayFiltered.reverse()
  }

  // Filter By Name
  updateFilter(event: any) {
    this.searchFilter = event.target.value
  }

  // Cards
  getCardId(i: number): string {
    let idString = 'recipeCard'
    if (i < this.recipes.length - 1) {
      return idString + i
    }
    return ''
  }

  // Pages
  get pagesCount() {
    return Math.ceil(this.recipes.length / this.recipesPerPage)
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--
    }
  }

  nextPage(): void {
    let n: number = this.recipes.length
    if (this.currentPage < this.pagesCount) {
      this.currentPage++
    }
  }

  goToPage(pageNumber: number): void {
    if (pageNumber > 0 && pageNumber <= this.pagesCount){
      this.currentPage = pageNumber
    } 
  }

  // Icons
  iconSearch = faMagnifyingGlass
}
