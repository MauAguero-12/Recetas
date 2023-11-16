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
  recipes: Recipe[] = []; // all recipes from service
  recipesFiltered: Recipe[] = []; // recipes after a filter was applied
  searchFilter: string = '' // user's input
  searchFilterMap: Map<string, number> = new Map<string, number>(); // counts each instance of each unique word in the filter
  sortingOrder: string = '' // sorting order (Newest, Oldest, or Alphabetic)
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

  getSortedRecipes(): Recipe[] {
    switch (this.sortingOrder) {
      case 'Newest':
        return this.recipes.slice().reverse()
      case 'Oldest':
        return this.recipes.slice()
      case 'Alphabetic':
        return this.recipes.slice().sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }));
      default:
        return this.recipes.slice(0, -1).reverse()
    }
  }

  // FILTER RECIPE
  // Timer for Search Filter update
  resetFilterTimer(event: any) {
    clearTimeout(this.filterTimer);
    this.filterTimer = setTimeout(() => {
      this.updateFilter(event);
    }, 500); // 500ms = 0.5s
    // }, 3000); // 3000ms = 3s
  }

  updateFilter(event: any) {
    // remove previous filters
    this.searchFilterMap.clear()

    this.searchFilter = event.target.value.trim()
    let words = this.getWords(this.searchFilter);
    words.forEach((word: string) => {
      this.addWordToMap(word, this.searchFilterMap)
    });

    // go to the first page after applying filter
    this.goToPage(1)
  }

  filterRecipes(): void {
    let n = this.recipes.length
    let sortedRecipes: Recipe[] = this.getSortedRecipes()
    // let sortedRecipes: Recipe[] = []
    let filteredArray: Recipe[] = []
    if (n > 1) {
      // if theres a filter
      if (this.searchFilterMap.size > 0) {
        // arrays for sorting
        let perfect_match_title: Recipe[] = []
        let perfect_match_desc: Recipe[] = []
        let partial_match: Recipe[] = []
        let partial_match_score: number[] = []

        // apply filter to all recipes
        let recipesArray: Recipe[] = sortedRecipes
        recipesArray.forEach(recipe => {
          // check for perfect match in title
          if (this.checkPerfectMatch(this.searchFilter, recipe.title)) {
            perfect_match_title.push(recipe)
          }

          // check for perfect match in description
          else if (this.checkPerfectMatch(this.searchFilter, recipe.description)) {
            perfect_match_desc.push(recipe)
          }

          // if not a perfect match, calculate score for recipe based on search filter 
          else {
            let allWords = true
            let score = 0
            this.searchFilterMap.forEach((wordCount, word) => {
              let title = this.getWords(recipe.title.toLowerCase())
              let desc = this.getWords(recipe.description.toLowerCase())

              let titleCount = this.countOccurrences(title, word)
              if (titleCount > wordCount) {
                titleCount = wordCount
              }

              let descCount = this.countOccurrences(desc, word)
              if (descCount > wordCount) {
                descCount = wordCount
              }
              score += titleCount * 3 + descCount

              allWords = allWords && (titleCount + descCount > 0)
            });
            if (allWords) {
              partial_match = this.insertSortRecipe(recipe, score, partial_match, partial_match_score)
              partial_match_score = this.insertSortScore(score, partial_match_score)
            }
          }
        });

        filteredArray = perfect_match_title
        filteredArray = filteredArray.concat(perfect_match_desc)
        filteredArray = filteredArray.concat(partial_match)
      } else {
        // if no filter, just sort recipes
        filteredArray = sortedRecipes

        //remove newest recipe
        // filteredArray = filteredArray.filter(item => item !== this.getLastRecipe()[0]);
      }
    }

    this.recipesFiltered = filteredArray
  }

  // get all words with regex expression
  getWords(str: string): string[] {
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

  // check for all of the words in the string in the same order
  checkPerfectMatch(words: string, str: string): boolean {
    let word_array: string[] = this.getWords(words.toLowerCase())
    let str_array: string[] = this.getWords(str.toLowerCase())

    if (word_array.length > str_array.length) {
      return false;
    }

    for (let i = 0; i <= str_array.length - word_array.length; i++) {
      // check every subarray
      let sub_array = str_array.slice(i, i + word_array.length);
      if (this.isPerfectMatch(sub_array, word_array)) {
        return true;
      }
    }

    return false;
  }

  isPerfectMatch(arr1: string[], arr2: string[]): boolean {
    return arr1.every((value, index) => value === arr2[index]);
  }

  // count the amount of times a string is in an array 
  countOccurrences(arr: string[], target: string): number {
    return arr.reduce((count, item) => (item === target ? count + 1 : count), 0);
  }

  //insert sort recipes (using scores array for sorting)
  insertSortRecipe(recipe: Recipe, score: number, recipesArr: Recipe[], scores: number[]): Recipe[] {
    let inserted = false
    for (let i = 0; i < recipesArr.length; i++) {
      // insert if current score is less than new score
      if (scores[i] < score) {
        let before = recipesArr.slice(0, i)
        before.push(recipe)
        let after = recipesArr.slice(i)

        recipesArr = before.concat(after)
        inserted = true
        break
      }
    }

    // insert at the end if not inserted in for loop
    if (!inserted) {
      recipesArr.push(recipe)
    }

    return recipesArr
  }

  //insert sort scores of recipes
  insertSortScore(score: number, scores: number[]): number[] {
    let inserted = false
    for (let i = 0; i < scores.length; i++) {
      // insert if current score is less than new score
      if (scores[i] < score) {
        let before = scores.slice(0, i)
        before.push(score)
        let after = scores.slice(i)

        scores = before.concat(after)
        inserted = true
        break
      }
    }

    // insert at the end if not inserted in for loop
    if (!inserted) {
      scores.push(score)
    }

    return scores
  }

  // SORTING
  sortRecipes(event: any) {
    this.sortingOrder = event.target.value
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
