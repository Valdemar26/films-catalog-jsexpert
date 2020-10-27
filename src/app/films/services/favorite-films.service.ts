import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { FilmListInterface } from '../interfaces/film-list.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoriteFilmsService {

  private favoriteFilmsArray = [];

  private favoriteFilmsArray$: BehaviorSubject<FilmListInterface[]> = new BehaviorSubject<FilmListInterface[]>([]);
  private favoriteFilmsList = [];

  constructor() { }

  public setFavoriteFilm(film: FilmListInterface): void {
    console.log(film, film.isFavorite);

    if (film.isFavorite) {
      this.setFavoriteFilmsArray(film);
    } else {
      const index = this.favoriteFilmsArray.indexOf(film.id);
      this.favoriteFilmsArray.splice(index, 1);
      this.favoriteFilmsArray$.next(this.favoriteFilmsArray);
    }
  }

  public removeFromFavoriteFilms(film: FilmListInterface): void {
    this.favoriteFilmsList = this.favoriteFilmsList.filter((item) => item.id !== film.id);
    localStorage.setItem('favoriteFilmsList', JSON.stringify(this.favoriteFilmsList));

    this.favoriteFilmsArray$.next(this.favoriteFilmsList);
  }

  public getFavoriteFilmsArray(): Observable<FilmListInterface[]> {
    return this.favoriteFilmsArray$.asObservable();
  }

  private setFavoriteFilmsArray(film: FilmListInterface): any {

    this.favoriteFilmsList.push(film);
    this.favoriteFilmsArray$.next([...new Set(this.favoriteFilmsList)]);
    localStorage.setItem('favoriteFilmsList', JSON.stringify([...new Set(this.favoriteFilmsList)]));
  }
}
