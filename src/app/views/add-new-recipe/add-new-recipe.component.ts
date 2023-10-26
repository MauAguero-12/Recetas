import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { ImageInputComponent } from 'src/app/components/image-input/image-input.component';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-add-new-recipe',
  templateUrl: './add-new-recipe.component.html',
  styleUrls: ['./add-new-recipe.component.css']
})
export class AddNewRecipeComponent {
  // Reactive Form
  recipeForm;
  constructor(private recipeService: RecipesService, private fb: FormBuilder) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      ingredients: this.fb.array([], [Validators.required, Validators.minLength(1)])
    })
  }

  getIngredientsArray(): string[] {
    let ingredientsArray: string[] = []
    let userIngredientsArray: string[] = this.recipeForm.value.ingredients as string[]
    userIngredientsArray.forEach((ingredient, index) => {
      ingredient = ingredient.trim()
      if (ingredient != '') {
        ingredientsArray.push(ingredient)
      }
    })
    // console.log(ingredientsArray)
    return ingredientsArray
  }
  getIngredientsForm(): FormArray {
    return this.recipeForm.controls['ingredients'] as FormArray
  }

  addIngredient(): void {
    let newIngredient = this.fb.control('');
    this.getIngredientsForm().push(newIngredient);
  }

  // Image Input
  newImage(event: string) {
    this.recipeForm.patchValue({ image: event })
  }

  @ViewChild(ImageInputComponent) imageInputComp: ImageInputComponent = new ImageInputComponent();
  getImage(): string {
    return this.imageInputComp.getImage()
  }



  getRecipes() {
    return this.recipeService.getRecipes()
  }

  saveRecipe(): void {
    if (this.recipeForm.valid) {
      let title = this.recipeForm.get('title')?.value
      let description = this.recipeForm.get('description')?.value
      let image = this.recipeForm.get('image')?.value
      let ingredients: string[] = this.getIngredientsArray()

      if (title && description && image && ingredients.length != 0) {
        let recipe: Recipe = {
          title: title, description: description, image: image, ingredients: ingredients
        }
        this.recipeService.addRecipe(recipe)
      }
    }
    else {
      // error
    }
  }

  // Icons
  iconX = faX


  print(){
    console.log(this.recipeService.getRecipes())
  }
}
