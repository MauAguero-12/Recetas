import { Component, OnInit } from '@angular/core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {
  // Atributes
  recipe: Recipe | null = null;
  checkedIngredients: boolean[] = [];

  // Basic Methods
  constructor(private recipeService: RecipesService) {
  }

  ngOnInit(): void {
    this.updateSelectedRecipe()
    if (this.recipe) {
      // labels 
      for (let i = 0; i < this.recipe.ingredients.length; i++) {
        this.checkedIngredients.push(false)
      }
    }
  }

  // New Recipe Selected
  updateSelectedRecipe(): void {
    let newRecipe = this.recipeService.getSelectedRecipe()
    if (newRecipe) {
      this.recipe = newRecipe
    }
  }

  // Checkboxes
  updateIngredient(i: number): void {
    this.checkedIngredients[i] = !this.checkedIngredients[i];
  }

  // Icons
  iconCircle = faCircle
}


