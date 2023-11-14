import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Atributes
  recipes: Recipe[] = [];
  recipesFiltered: Recipe[] = [];
  searchFilter: Map<string, number> = new Map<string, number>();
  currentPage = 1;
  recipesPerPage = 12;
  filterTimer: any;

  // Basic Methods
  constructor(private router: Router, private recipeService: RecipesService) { }

  // Recipes
  updateRecipes(): void {
    this.recipes = this.recipeService.getRecipes()
  }

  getLastRecipe(): Recipe[] {
    if (this.recipes.length > 0) {
      return this.recipes.slice(-1)
    }
    return []
  }

  filterRecipes(): void {
    let n = this.recipes.length
    let filteredArray: Recipe[] = []
    if (n > 1) {
      // if theres a filter
      if (this.searchFilter.size > 0) {
        //arrays for sorting
        let recipes_title_count: Recipe[] = []
        let recipes_description_count: Recipe[] = []

        let recipesArray: Recipe[] = this.recipes.slice().reverse()
        // for each recipe apply filter
        recipesArray.forEach(recipe => {
          let recipeTitle = this.getWords(recipe.title.toLowerCase())
          let recipeDescription = this.getWords(recipe.description.toLowerCase())

          //variables for sorting
          let inTitle = true
          let inDescription = true

          // check for every word of the filter in the recipe
          this.searchFilter.forEach((count, word) => {
            if (recipeTitle.includes(word)) {
              inTitle = inTitle && true
            } else{
              inTitle = false
              if (recipeDescription.includes(word)) {
                inDescription = inDescription && true
              } else{
                inDescription = false
              }
            }

            
          });

          if (inTitle) {
            recipes_title_count.push(recipe)
          }
          else if (inDescription) {
            recipes_description_count.push(recipe)
          }
        });
        filteredArray = recipes_title_count.concat(recipes_description_count)
      } else {
        // remove last recipe if no filters
        filteredArray = this.recipes.slice(0, -1)
        filteredArray.reverse()
      }
    }

    // reversed to display newest first
    this.recipesFiltered = filteredArray
  }

  // Timer for Search Filter
  resetFilterTimer(event: any) {
    clearTimeout(this.filterTimer);
    this.filterTimer = setTimeout(() => {
      this.updateFilter(event);
    }, 500); // 500ms = 0.5s
    // }, 3000); // 3000ms = 3s
  }

  // Filter By Name
  updateFilter(event: any) {
    // remove previous filters
    this.searchFilter.clear()

    
    let words = this.getWords(event.target.value);
    words.forEach((word: string) => {
      this.addWordToMap(word, this.searchFilter)
    });

    // go to the first page after applying filter
    this.goToPage(1)
  }

  // get all words with regex expression
  getWords(str: string): string[]{
    return str.split(/[\s\W]+/)
  }

  // add each word to the search filter
  addWordToMap(word: string, map: Map<string, number>) {
    let count = map.get(word) || 0
    word = word.toLowerCase()
    if (count) { // if the word is already in the map, add +1 to the count
      map.set(word, count + 1)
    } else if (word.length) { // else add the word to the map
      map.set(word, 1)
    }
  }

  // Cards
  updatePageCardClicks(): void {
    // add click event to recipe cards
    let recipeCards = document.getElementsByClassName('recipeCards')
    for (let i = 0; i < recipeCards.length; i++) {
      let card = recipeCards[i] as HTMLElement
      if (card) {
        card.onclick = () => {
          let recipe: Recipe;
          if (i != 0) { // if smaller cards
            let recipesPage: Recipe[] = this.getCurrentPage(this.recipesFiltered)
            recipe = recipesPage[i - 1]
          } else { // else newest recipe card
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
    return Math.ceil(this.recipesFiltered.length / this.recipesPerPage)
  }

  goToPage(pageNumber: number): void {
    if (pageNumber > 0 && pageNumber <= this.pagesCount) {
      this.currentPage = pageNumber
    }
  }

  getCurrentPage(sortedRecipes: Recipe[]): Recipe[] {
    let nFiltered: number = sortedRecipes.length
    let start: number = this.recipesPerPage * (this.currentPage - 1)
    let end: number = start + this.recipesPerPage
    let currentPage: Recipe[] = []
    if (start < 0) {
      start = 0
    }

    if (end >= nFiltered) {
      currentPage = sortedRecipes.slice(start)
    } else {
      currentPage = sortedRecipes.slice(start, end)
    }
    return currentPage
  }

  disablePaginationButtons() {
    let previous = document.getElementById('paginationPrevious')
    if (this.currentPage - 1 < 1) {
      previous?.classList.add('disabled')
    } else {
      previous?.classList.remove('disabled')
    }

    let next = document.getElementById('paginationNext')
    if (this.currentPage + 1 > this.pagesCount) {
      next?.classList.add('disabled')
    } else {
      next?.classList.remove('disabled')
    }
  }

  // Icons
  iconSearch = faMagnifyingGlass
}
