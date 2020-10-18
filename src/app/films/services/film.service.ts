import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { GenresListInterface } from '../interfaces/genres-list.interface';
import { GenresInterface } from '../interfaces/genres.interface';
import { FilmListInterface } from '../interfaces/film-list.interface';
import {FilmInterface} from '../interfaces/film.interface';


@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private apiKey = environment.movieDbApiKey;

  private popularFilmUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=uk-UA&page=1`;
  private nextPagePopularFilmUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=uk-UA&page=`;
  private genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=uk-UA`;

  private count = 1;

  private filmList$: BehaviorSubject<FilmListInterface[]> = new BehaviorSubject(null);
  private filmListArray: FilmListInterface[] = [];

  private genresList$: BehaviorSubject<any[]> = new BehaviorSubject(null);

  private favoriteFilmsCount$: Subject<number> = new Subject();
  private favoriteFilmsArray = [];

  private currentFilm$: Subject<FilmListInterface> = new Subject<FilmListInterface>();

  constructor(private http: HttpClient) { }

  public initFilmList(): Observable<any> {

    return this.http.get(this.popularFilmUrl).pipe(
      tap((filmList: FilmInterface) => {
        console.log(filmList);
        this.updateFilmList(filmList.results);
      }),
      catchError( (error) => error)
    );
  }

  public getMoreFilms(): Subscription {
    this.count++;
    return this.http.get(`${this.nextPagePopularFilmUrl}${this.count}`)
      .subscribe((films: FilmInterface) => {
        console.log(films);
        this.updateFilmList(films.results);
      });
  }

  public updateFilmList(value: FilmListInterface[]): void {
    if (value && value.length) {
      value.forEach((val) => this.filmListArray.push(val));
      this.filmList$.next(this.filmListArray);

      console.log('films: ', this.filmListArray);
    }
  }

  public get getFilmList(): Observable<FilmListInterface[]> {
    return this.filmList$.asObservable();
  }

  public get getGenresList(): Observable<GenresListInterface[]> {
    return this.genresList$.asObservable();
  }

  public setFavoriteFilm(film: FilmListInterface): void {
    if (film.isFavorite) {
      this.favoriteFilmsArray.push(film.id);
      localStorage.setItem('favoriteFilms', JSON.stringify(this.favoriteFilmsArray));
    } else {
      const index = this.favoriteFilmsArray.indexOf(film.id);
      this.favoriteFilmsArray.splice(index, 1);
      localStorage.setItem('favoriteFilms', JSON.stringify(this.favoriteFilmsArray));
    }

    this.favoriteFilmsCount$.next(this.favoriteFilmsArray.length);
  }

  public getCountFavoriteFilm(): Observable<number> {
    return this.favoriteFilmsCount$.asObservable();
  }

  public sortFilmByTitle(value): Subscription {
    const direction = !!parseInt(value, 10) ? -1 : 1;

    return this.getFilmList.subscribe((films: FilmListInterface[]) => {
      return films.sort(
        (a: FilmListInterface, b: FilmListInterface) => direction * (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)
      );
    });
  }

  public initGenresList(): Observable<any> {
    return this.http.get(this.genresUrl).pipe(
      tap((genres: GenresInterface) => {
        console.log('genres: ', genres);
        this.genresList$.next(genres.genres);
      }),
      catchError( (error) => error)
    );
  }

  public getFilmById(id: number): any {
    this.getFilmList.subscribe((filmList: FilmListInterface[]) => {
      this.filmListArray = filmList;
    });

    if (this.filmListArray && this.filmListArray.length) {
      const currentFilm = this.filmListArray.find((film: FilmListInterface) => film.id === Number(id));
      this.currentFilm$.next(currentFilm);
    }
  }

  public getFilmObservable(): Observable<FilmListInterface> {
    return this.currentFilm$.asObservable();
  }

}
