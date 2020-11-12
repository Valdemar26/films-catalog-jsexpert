import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { FilmListInterface } from '../interfaces/film-list.interface';
import {FilmService} from './film.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteFilmsService {

  // private favoriteFilmsArray = [];

  private favoriteFilmsArray$: BehaviorSubject<FilmListInterface[]> = new BehaviorSubject<FilmListInterface[]>([]);

  constructor(public filmService: FilmService) { }

  public setFavoriteFilm(): void {

    let favFilm = [];
    this.filmService.getFilmList.subscribe((films: FilmListInterface[]) => {
      favFilm = films;
    });

    this.filmService.filmList$.next(favFilm);
    localStorage.setItem('filmListArray', JSON.stringify(favFilm));
  }

  // public removeFromFavoriteFilms(film: FilmListInterface): void {
  //   film.isFavorite = false;
  //   this.favoriteFilmsArray = this.favoriteFilmsArray.filter((item) => item.id !== film.id);
  //   this.setFavoritesToLocalStorage(this.favoriteFilmsArray);
  // }

  public getFavoriteFilmsArray(): Observable<FilmListInterface[]> {
    return this.favoriteFilmsArray$.asObservable();
  }

  // private setFavoriteFilmsArray(film: FilmListInterface): any {
  //
  //   this.favoriteFilmsArray.push(film);
  //
  //   this.setFavoritesToLocalStorage(this.favoriteFilmsArray);
  // }

  // setFavoritesToLocalStorage(favoritesArray: FilmListInterface[]): void {
  //
  //   const unique = [];
  //
  //   favoritesArray.forEach(film => unique.filter(f => f.id === film.id).length > 0 ? null : unique.push(film));
  //
  //   localStorage.setItem('favoriteFilmsList', JSON.stringify(unique));
  //   this.favoriteFilmsArray$.next(unique);
  // }
}
