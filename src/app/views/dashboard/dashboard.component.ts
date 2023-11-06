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
  // searchFilter: string[] = [];
  currentPage = 1;
  recipesPerPage = 12;


  // Basic Methods
  constructor(private router: Router, private recipeService: RecipesService) { }

  ngOnInit(): void {
    // get recipes from service
    this.recipes = this.recipeService.getRecipes()
  }

  ngAfterViewInit(): void {
    this.updatePageCardClicks()
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
      if (this.searchFilter.length > 0) {
        // let tokens = this.searchFilter
        // array in order of less to more matches with tokens (reversed later)
        
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
    // let tokens = event.target.value.split(/[\s\W]+/);
    // this.searchFilter = tokens
    // go to page 1
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

  updatePageCardClicks(): void {
    // add click event to recipe cards
    let recipeCards = document.getElementsByClassName('recipeCards')
    for (let i = 0; i < recipeCards.length; i++) {
      let card = recipeCards[i] as HTMLElement
      if (card) {
        card.onclick = () => {
          let recipe: Recipe;
          if (i != 0) {
            recipe = this.recipesFiltered[i - 1]
          } else {
            let n = this.recipes.length
            recipe = this.recipes[n - 1]
          }
          this.recipeService.setSelectedRecipe(recipe)
          this.router.navigateByUrl('view')
        }
      }
    }
  }

  // Pagination
  get pagesCount() {
    return Math.ceil(this.recipes.length / this.recipesPerPage)
  }

  goToPage(pageNumber: number): void {
    if (pageNumber > 0 && pageNumber <= this.pagesCount) {
      this.currentPage = pageNumber
    }
  }

  // Icons
  iconSearch = faMagnifyingGlass
}
