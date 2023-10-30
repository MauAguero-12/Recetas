import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {
  recipe: Recipe;
  constructor(private recipeService: RecipesService) {
    this.recipe = { title: 'Dummy', description: 'dummy', image: '', ingredients: ['dummy', 'dummy2'] }
  }

  ngOnInit(): void {
    this.updateSelectedRecipe()
    for (let i = 0; i < this.recipe.ingredients.length; i++) {
      this.checkedLabels.push(false)
    }
  }

  updateSelectedRecipe(): void {
    let newRecipe = this.recipeService.getSelectedRecipe()
    if (newRecipe) {
      this.recipe = newRecipe
    }
  }

  //
  checkedLabels: boolean[] = [];

  getInputId(i: number): string {
    return 'ingredient' + i;
  }

  updateLabel(i: number): void {
    this.checkedLabels[i] = !this.checkedLabels[i];
  }
}


