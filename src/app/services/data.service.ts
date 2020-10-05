import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';
import { FilmInterface } from '../film-catalog/interfaces/film.interface';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  public favoriteFilms = new Map();

  private apiKey = environment.movieDbApiKey;
  private popularFilmUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=uk-UA&page=1`;

  private filmList$: BehaviorSubject<FilmInterface[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  public initFilmList(): Observable<any> {
    return this.http.get(this.popularFilmUrl).pipe(delay(700));
  }

  public updateFilmList(value: FilmInterface[]): void {
    if (value && value.length) {
      this.filmList$.next(value);
    }
  }

  public get getFilmList(): Observable<FilmInterface[]> {
    return this.filmList$.asObservable();
  }

  public setFavoriteFilm(favorite: FilmInterface): Map<any, any> {
    if (favorite.isFavorite) {
      this.favoriteFilms.set(favorite.title, favorite);
    } else {
      this.favoriteFilms.delete(favorite.title);
    }

    localStorage.setItem('favoriteFilms', JSON.stringify([...this.favoriteFilms.keys()]));
    return this.favoriteFilms;
  }

  public getFavoriteFilm(): any {

    const favoriteFilmsArray = localStorage.getItem('favoriteFilms');
    const count = favoriteFilmsArray.length;

    console.log(favoriteFilmsArray, typeof(favoriteFilmsArray), count);

    return localStorage.getItem('favoriteFilms').length;
  }

  // todo create search film method
  public searchFilmByTitle(): void {

  }

  public sortFilmByTitle(value): Subscription {

    const direction = !!parseInt(value, 10) ? -1 : 1;
    return this.getFilmList.subscribe((films: FilmInterface[]) => {
      console.log('FILMS: ', films);
      return films.sort((a: FilmInterface, b: FilmInterface) => direction * (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
    });

  }
}
