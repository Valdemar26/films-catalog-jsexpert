import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { FilmListInterface } from '../interfaces/film-list.interface';
import { FilmService } from './film.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteFilmsService {

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

  public removeFromFavoriteFilms(film: FilmListInterface): void {
    const allFilms = JSON.parse(localStorage.getItem('filmListArray'));
    allFilms.find((filmItem: FilmListInterface) => filmItem.id === film.id).isFavorite = false;

    this.filmService.filmList$.next(allFilms);
    localStorage.setItem('filmListArray', JSON.stringify(allFilms));
  }

  public getFavoriteFilmsArray(): Observable<FilmListInterface[]> {
    return this.favoriteFilmsArray$.asObservable();
  }
}
