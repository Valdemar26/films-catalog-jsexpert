import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { FilmListInterface } from '../interfaces/film-list.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoriteFilmsService {

  private favoriteFilmsCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private favoriteFilmsArray = [];

  private favoriteFilmsArray$: BehaviorSubject<FilmListInterface[]> = new BehaviorSubject<FilmListInterface[]>([]);
  private favoriteFilmsList = [];

  constructor() { }

  public setFavoriteFilm(film: FilmListInterface): void {

    if (film.isFavorite) {
      this.favoriteFilmsArray.push(film.id);
      this.setFavoriteFilmsArray(film);
    } else {
      const index = this.favoriteFilmsArray.indexOf(film.id);
      this.favoriteFilmsArray.splice(index, 1);
    }

    localStorage.setItem('favoriteFilms', JSON.stringify(this.favoriteFilmsArray));

    this.favoriteFilmsCount$.next(this.favoriteFilmsArray.length);
  }

  public removeFromFavoriteFilms(film: FilmListInterface): void {
    this.favoriteFilmsList = this.favoriteFilmsList.filter((item) => item.id !== film.id);
    localStorage.setItem('favoriteFilmsList', JSON.stringify(this.favoriteFilmsList));

    this.favoriteFilmsCount$.next(this.favoriteFilmsList.length);
    this.favoriteFilmsArray$.next(this.favoriteFilmsList);
  }

  public getCountFavoriteFilm(): Observable<number> {
    return this.favoriteFilmsCount$.asObservable();
  }

  public getFavoriteFilmsArray(): Observable<FilmListInterface[]> {
    return this.favoriteFilmsArray$.asObservable();
  }

  private setFavoriteFilmsArray(film: FilmListInterface): any {

    this.favoriteFilmsList.push(film);
    this.favoriteFilmsArray$.next(this.favoriteFilmsList);
    localStorage.setItem('favoriteFilmsList', JSON.stringify(this.favoriteFilmsList));
  }
}
