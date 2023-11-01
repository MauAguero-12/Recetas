import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AddNewRecipeComponent } from './views/add-new-recipe/add-new-recipe.component';
import { ViewRecipeComponent } from './views/view-recipe/view-recipe.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent
  },
  {
    path: 'add', component: AddNewRecipeComponent
  },
  {
    path: 'view', component: ViewRecipeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
