import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilmsResolver } from './films/resolvers/film.resolver';
import { AuthGuard } from './shared/guards/auth-guard.service';  // TODO use in some route

import { LoginComponent } from './shared/components/login/login.component';
import { RegistrationComponent } from './shared/components/registration/registration.component';

import { FavoriteFilmsComponent } from './films/components/favorite-films/favorite-films.component';
import { FavoriteGuard } from './shared/guards/favorite.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  {
    path: 'main',
    loadChildren: () => import('./welcome/welcome.module')
      .then(m => {
        console.log('Welcome Module');
        return m.WelcomeModule;
      })
  },
  {
    path: 'films',
    loadChildren: () => import('./films/films.module')
      .then(m => {
        console.log('Films Module');
        return m.FilmsModule;
      })
  },
  {
    path: 'actors',
    loadChildren: () => import('./actors/actors.module')
      .then(m => {
        console.log('Actors Module');
        return m.ActorsModule;
      })
  },
  { path: 'favorite-films', component: FavoriteFilmsComponent, resolve: { data: FilmsResolver }, canActivate: [FavoriteGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '**', redirectTo: 'main' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
