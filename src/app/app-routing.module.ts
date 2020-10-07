import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { FilmsListComponent } from './films/components/films-list/films-list.component';
import { ActorsListComponent } from './actors/components/actors-list/actors-list.component';
import { WelcomeComponent } from './welcome/components/welcome/welcome.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  { path: 'main', component: WelcomeComponent },
  { path: 'films', component: FilmsListComponent },
  { path: 'actors', component: ActorsListComponent },
  { path: '**', redirectTo: 'main' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
