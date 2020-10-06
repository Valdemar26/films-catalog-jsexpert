import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import {delay, catchError, tap, map} from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';
import { FilmInterface } from '../film-catalog/interfaces/film.interface';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  public favoriteFilms = new Map();

  private apiKey = environment.movieDbApiKey;
  private popularFilmUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=uk-UA&page=1`;
  private genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=uk-UA`;

  private filmList$: BehaviorSubject<FilmInterface[]> = new BehaviorSubject(null);

  private favoriteFilmsCount$: Subject<number> = new Subject();

  constructor(private http: HttpClient) { }

  public initFilmList(): Observable<any> {

    const selectedFilms = JSON.parse(localStorage.getItem('favoriteFilms'));

    return this.http.get(this.popularFilmUrl).pipe(
      map((filmList: any) => {
        const transformedFilmList = filmList.results.map((film) => {
          if (selectedFilms.includes(film.title)) {
            film.isFavorite = true;
          }

          return film;
        });

        return {...filmList, results: transformedFilmList};
      }),
      delay(700),
      catchError( (error) => error)
    );
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

      this.favoriteFilmsCount$.next(Array.from(this.favoriteFilms.keys()).length);
    } else {
      this.favoriteFilms.delete(favorite.title);

      this.favoriteFilmsCount$.next(Array.from(this.favoriteFilms.keys()).length);
    }

    localStorage.setItem('favoriteFilms', JSON.stringify([...this.favoriteFilms.keys()]));
    return this.favoriteFilms;
  }

  public getFavoriteFilm(): Observable<number> {

    const favoriteFilmsArray = localStorage.getItem('favoriteFilms');
    const counter = JSON.parse(favoriteFilmsArray).length;
    this.setCountFavoriteFilm(counter);
    return of(counter);
  }

  public getCountFavoriteFilm(): Observable<number> {
    return this.favoriteFilmsCount$.asObservable().pipe(
      tap(result => console.log(result))
    );
  }

  public setCountFavoriteFilm(countFilms: number): void {
    this.favoriteFilmsCount$.next(countFilms);
  }

  public sortFilmByTitle(value): Subscription {

    const direction = !!parseInt(value, 10) ? -1 : 1;
    return this.getFilmList.subscribe((films: FilmInterface[]) => {
      console.log('FILMS: ', films);
      return films.sort((a: FilmInterface, b: FilmInterface) => direction * (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
    });

  }

  public getGenres(): any {
    return this.http.get(this.genresUrl);
  }
}
