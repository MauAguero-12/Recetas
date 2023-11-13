import { Component, OnInit, ViewChild } from '@angular/core';
import { faBook, faHouseChimney, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RecipesService } from 'src/app/services/recipes.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private recipeService: RecipesService) { }

  ngOnInit(): void {
    // delete recipes on click
    let deleteRecipes = document.getElementById('deleteRecipes')
    if (deleteRecipes) {
      deleteRecipes.onclick = () => {
        this.recipeService.deleteRecipes()
        // (show modal first)
        // this.showModal()
      }
    }
  }

  // Modal (Comented because it is not yet implemented)
  // headerText = 'Está seguro que quiere eliminar todas las recetas?'
  // bodyText = 'Una vez se eliminen, no habrá forma de recuperarlas.'
  // @ViewChild(ModalComponent) modalComp!: ModalComponent;
  // showModal() {
  //   this.modalComp.showModal()
  // }

  // modalClosed(i: number) {
  //   // delete recipes from the service
  //   this.recipeService.deleteRecipes()
  // }

  // Icons
  iconHouseChimney = faHouseChimney
  iconBook = faBook
  iconTrash = faTrash
}
