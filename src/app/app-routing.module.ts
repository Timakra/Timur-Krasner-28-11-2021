import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteLocationsComponent } from './components/favorite-locations/favorite-locations.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'fav',component: FavoriteLocationsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
