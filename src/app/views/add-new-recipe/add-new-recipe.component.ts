import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ImageInputComponent } from 'src/app/components/image-input/image-input.component';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-add-new-recipe',
  templateUrl: './add-new-recipe.component.html',
  styleUrls: ['./add-new-recipe.component.css']
})
export class AddNewRecipeComponent{
  // Reactive Form
  recipeForm;
  constructor(private recipeService: RecipesService, private fb: FormBuilder){
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      ingredients: this.fb.array([], [Validators.required, Validators.minLength(1)])
    })
  }

  getIngredientsForm(): FormArray{
    return this.recipeForm.controls['ingredients'] as FormArray
  }

  addIngredient(): void{
    let newIngredient = this.fb.control('', Validators.required);
    this.getIngredientsForm().push(newIngredient);
  }

  // Image Input
  newImage(event: string){
    this.recipeForm.patchValue({image: event})
  }

  @ViewChild(ImageInputComponent) imageInputComp: ImageInputComponent = new ImageInputComponent();
  getImage(): string{
    return this.imageInputComp.getImage()
  }



  getRecipes(){
    return this.recipeService.getRecipes()
  }

  saveRecipe(): void{
    if (this.recipeForm.valid){
      let title = this.recipeForm.get('title')?.value
      let description = this.recipeForm.get('description')?.value
      let image = this.recipeForm.get('image')?.value
      let ingredients = this.recipeForm.get('ingredients')?.value

      if (title && description && image && ingredients){
        let recipe: Recipe = {
          title: title, description: description, image: image, ingredients: []
        }
        this.recipeService.addRecipe(recipe)
      }
    }
    else{
      // error
    }
  }





  // FALTA BORRAR
  print(){
    console.log(this.getRecipes())
  }
}
