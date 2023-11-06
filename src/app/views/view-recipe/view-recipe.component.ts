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
  checkedLabels: boolean[] = [];

  // Basic Methods
  constructor(private recipeService: RecipesService) {
    // this.recipe = { title: '', description: '', image: '', ingredients: ['', ''] }
  }

  ngOnInit(): void {
    this.updateSelectedRecipe()
    if (this.recipe) {
      // labels 
      for (let i = 0; i < this.recipe.ingredients.length; i++) {
        this.checkedLabels.push(false)
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
  updateLabel(i: number): void {
    this.checkedLabels[i] = !this.checkedLabels[i];
  }

  // Icons
  iconCircle = faCircle
}


