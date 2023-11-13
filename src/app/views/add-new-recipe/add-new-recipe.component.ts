import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from 'src/app/components/modal/modal.component';
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
  constructor(private router: Router, private recipeService: RecipesService, private fb: FormBuilder) {
    this.recipeForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      ingredients: this.fb.array([''], [Validators.required, Validators.minLength(1)])
    })
  }

  getIngredientsArray(): string[] {
    let ingredientsArray: string[] = []
    let userIngredientsArray: string[] = this.recipeForm.value.ingredients as string[]
    // remove empty ingredients
    userIngredientsArray.forEach((ingredient) => {
      ingredient = ingredient.trim()
      if (ingredient != '') {
        ingredientsArray.push(ingredient)
      }
    })
    return ingredientsArray
  }

  getIngredientsForm(): FormArray {
    return this.recipeForm.controls['ingredients'] as FormArray
  }

  addIngredient(): void {
    let newIngredient = this.fb.control('');
    this.getIngredientsForm().push(newIngredient);
    this.validateIngredients()
  }

  removeIngredient(i: number): void {
    this.getIngredientsForm().removeAt(i)
    this.validateIngredients()
  }

  // Validators
  // Title & Description
  validateField(field: string): boolean {
    let input = document.getElementById(field + 'Input')
    let alert = document.getElementById('wrong-' + field)
    let fieldForm = (this.recipeForm.get(field)?.value as string).trim()
    if (fieldForm) {
      input?.classList.remove('wrong-input')
      alert?.classList.add('wrong-hidden')
      return true
    } else {
      input?.classList.add('wrong-input')
      alert?.classList.remove('wrong-hidden')
      return false
    }
  }

  // Image
  validateImage(): boolean {
    let imageComponent = document.getElementById('image-comp')
    let alert = document.getElementById('wrong-image')
    let image = (this.recipeForm.get('image')?.value as string).trim()
    if (image) {
      imageComponent?.classList.remove('wrong-image-comp')
      alert?.classList.add('wrong-hidden')
      return true
    } else {
      imageComponent?.classList.add('wrong-image-comp')
      alert?.classList.remove('wrong-hidden')
      return false
    }
  }

  // Ingredients
  validateIngredients(): boolean {
    let inputs = Array.from(document.getElementsByClassName('ingredientInput'))
    let alert = document.getElementById('wrong-ingredients')
    if (this.getIngredientsArray().length) {
      inputs.forEach(input => {
        input.classList.remove('wrong-input')
      });
      alert?.classList.add('wrong-hidden')
      return true
    } else {
      inputs.forEach(input => {
        input.classList.add('wrong-input')
      });
      alert?.classList.remove('wrong-hidden')
      return false
    }
  }

  // check all fields
  validForm(): boolean {
    let validTitle: boolean = this.validateField('title')
    let validDescription: boolean = this.validateField('description')
    let validImage: boolean = this.validateImage()
    let validIngredients: boolean = this.validateIngredients()
    if (validTitle && validDescription && validImage && validIngredients) {
      return true
    }
    return false
  }

  // Image Input
  newImage(event: string) {
    this.recipeForm.patchValue({ image: event })
    this.validateImage()
  }

  // Saving Recipe
  saveRecipe(): void {
    if (this.validForm()) {
      let title = this.recipeForm.get('title')?.value
      let description = this.recipeForm.get('description')?.value
      let image = this.recipeForm.get('image')?.value
      let ingredients: string[] = this.getIngredientsArray()

      if (title && description && image && ingredients.length) {
        let recipe: Recipe = { title: title, description: description, image: image, ingredients: ingredients }
        this.recipeService.addRecipe(recipe)
      }
    }
    this.showModal()
  }

  // Modal
  headerText: string = ''
  bodyText: string = ''
  @ViewChild(ModalComponent) modalComp!: ModalComponent;
  showModal() {
    if (this.validForm()) {
      this.headerText = 'La receta fue guardada con éxito'
      this.bodyText = 'Va a ser redirigido a la página principal'
    } else {
      this.headerText = 'Se ha presentado un error'
      this.bodyText = 'La información ingresada es incorrecta'
    }
    this.modalComp.showModal()
  }

  modalClosed(i: number) {
    if (this.validForm()) {
      this.router.navigateByUrl('')
    }
  }

  // Icons
  iconMinus = faMinus
}
