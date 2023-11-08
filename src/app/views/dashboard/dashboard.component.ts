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
  searchFilter: Map<string, number> = new Map<string, number>();
  currentPage = 1;
  recipesPerPage = 12;


  // Basic Methods
  constructor(private router: Router, private recipeService: RecipesService) { }

  ngOnInit(): void {
    // get recipes from service
    // this.recipes = this.recipeService.getRecipes()
    this.getFilteredRecipes()
  }

  ngAfterViewInit(): void {
    this.updatePageCardClicks()
  }

  // Recipes
  updateRecipes():void{
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

  getLastRecipe(): Recipe[] {
    if (this.recipes.length > 0) {
      return this.recipes.slice(-1)
    }
    return []
  }

  getFilteredRecipes(): void {
    let n = this.recipes.length
    let recipesArray: Recipe[] = []
    let filteredArray: Recipe[] = []
    if (n > 1) {
      // remove last recipe
      recipesArray = this.recipes.slice(0, -1)

      // if theres a filter
      if (this.searchFilter.size > 0) {
        // for each recipe apply filter
        recipesArray.forEach(recipe => {
          let recipeTitle = recipe.title.toLowerCase()
          let allWords: boolean = true

          //check for every word of the filter in the recipe
          this.searchFilter.forEach((count, word) => {
            allWords = allWords && (recipeTitle.includes(word))
          });

          if (allWords) {
            filteredArray.push(recipe)
          }
        });
      } else {
        filteredArray = recipesArray
      }
    }

    // reverse to display newest first
    this.recipesFiltered = filteredArray.reverse()
  }

  // Filter By Name
  updateFilter(event: any) {
    // remove previous filters
    this.searchFilter.clear()

    // Regex expression to get all words
    let tokens = event.target.value.split(/[\s\W]+/) as string[];
    tokens.forEach((element: string) => {
      this.addWordToMap(element, this.searchFilter)
    });

    // go to page 1
    this.goToPage(1)
  }

  addWordToMap(word: string, map: Map<string, number>) {
    let count = map.get(word) || 0
    word = word.toLowerCase()
    if (count) {
      map.set(word, count + 1)
    } else if (word.length) {
      map.set(word, 1)
    }
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

  // Icons
  iconSearch = faMagnifyingGlass
}
