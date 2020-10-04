import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './film-catalog/main/main.component';
import { FilmsListComponent } from './films/components/films-list/films-list.component';
import { ActorsListComponent } from './actors/components/actors-list/actors-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  { path: 'main', component: MainComponent },
  { path: 'films', component: FilmsListComponent },
  { path: 'actors', component: ActorsListComponent },
  { path: '**', redirectTo: 'main' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
