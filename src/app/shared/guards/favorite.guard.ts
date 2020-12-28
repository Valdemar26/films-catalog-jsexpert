import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { FilmListInterface } from '../../films/interfaces/film-list.interface';
import { FilmService } from '../../films/services/film.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteGuard implements CanActivate {

  constructor(private router: Router, private filmService: FilmService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const films = this.filmService.getFilmListArray;

    const favFilms = films.filter((film: FilmListInterface) => film.isFavorite);

    if (favFilms && favFilms.length) {
      return true;
    } else {
      this.router.navigate(['/', 'main']);
      return false;
    }
  }

}
