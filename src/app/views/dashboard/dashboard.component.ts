import { Component } from '@angular/core';
import { Recipe } from 'src/app/interfaces/recipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // ATRIBUTES
  recipes:Recipe[] = []

  // METHODS
  addRecipe(title: string, description: string, image: string, ingredients: string[]): void{
    let newRecipe:Recipe = {title: title, description: description, image: image, ingredients: ingredients}
    this.recipes.push(newRecipe)
  }

  getAllRecipes(): Recipe[]{
    return this.recipes
  }

  getLastRecipe(): Recipe|void{
    if (this.recipes.length != 0){
      return this.recipes[-1]
    }
  }
  
  // FALTA BORRAR
  addNew(){
    this.addRecipe('Nueva Receta', 'asdfgh', 'url', ['1', '2', '3'])
  }
}
