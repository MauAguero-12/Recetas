import { Component, OnInit } from '@angular/core';
import { faBook, faHouseChimney, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private recipeService: RecipesService) { }

  ngOnInit(): void {
    // remove recipes on click
    let deleteRecipes = document.getElementById('deleteRecipes')
    if (deleteRecipes) {
      deleteRecipes.onclick = () => {
        this.recipeService.deleteRecipes()
        console.log(this.recipeService.getRecipes())
      }
    }


  }

  // Icons
  iconHouseChimney = faHouseChimney
  iconBook = faBook
  iconTrash = faTrash
}
