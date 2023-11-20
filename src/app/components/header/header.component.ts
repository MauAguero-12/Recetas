import { Component, OnInit, ViewChild } from '@angular/core';
import { faBook, faHouseChimney, faMoon, faSun, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RecipesService } from 'src/app/services/recipes.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private recipeService: RecipesService, private themeService: ThemeService) { }

  ngOnInit(): void {
    // onclick event to delete recipes
    let deleteRecipes = document.getElementById('deleteRecipes')
    if (deleteRecipes) {
      deleteRecipes.onclick = () => {
        this.recipeService.deleteRecipes()
      }
    }

    // input checked
    this.inputChecked = this.checkboxChecked()
  }

  // Theme Checkbox
  inputChecked = false

  checkboxChecked(): boolean {
    console.log(this.themeService.getTheme() === 'theme-dark')
    return this.themeService.getTheme() === 'theme-dark'
  }

  changeTheme() {
    if (this.inputChecked) {
      this.themeService.setTheme('theme-dark')
    } else {
      this.themeService.setTheme('theme-default')
    }
  }

  getToggleIcon(){
    if (this.inputChecked){
      return faMoon
    }
    return faSun
  }

  // Icons
  iconHouseChimney = faHouseChimney
  iconBook = faBook
  iconTrash = faTrash
}
