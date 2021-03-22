import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { FilmsResolver } from './resolvers/film.resolver';
import { FilmsListComponent } from './components/films-list/films-list.component';
import { FilmDetailComponent } from './components/films-list/film-item/film-detail/film-detail.component';

const routes: Routes = [
  {
    path: '',
    component: FilmsListComponent,
    resolve: { data: FilmsResolver }
  },
  {
    path: ':id',
    component: FilmDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilmsRoutingModule {
}
