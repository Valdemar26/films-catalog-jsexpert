import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import {BehaviorSubject, Observable, of, Subject, Subscription} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { GenresListInterface } from '../interfaces/genres-list.interface';
import { GenresInterface } from '../interfaces/genres.interface';
import { FilmListInterface } from '../interfaces/film-list.interface';
import { FilmInterface } from '../interfaces/film.interface';
import {FavoriteFilmsService} from './favorite-films.service';


@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private apiKey = environment.movieDbApiKey;

  private popularFilmUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=uk-UA&page=1`;
  private nextPagePopularFilmUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=uk-UA&page=`;
  private genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=uk-UA`;
  private movieUrl = 'https://api.themoviedb.org/3/movie/';

  private count = 1;

  public filmList$: BehaviorSubject<FilmListInterface[]> = new BehaviorSubject<FilmListInterface[]>(null);
  private filmListArray: FilmListInterface[] = [];

  private genresList$: BehaviorSubject<any[]> = new BehaviorSubject(null);

  private currentFilm$: Subject<FilmListInterface> = new Subject<FilmListInterface>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public initFilmList(): Observable<any> {

    // get FIlmList from LocalStorage (if exist)
    if (localStorage.getItem('filmListArray')) {
      this.updateFilmList(JSON.parse(localStorage.getItem('filmListArray')));
      return of(true);
    }

    return this.http.get(this.popularFilmUrl).pipe(
      tap((filmList: FilmInterface) => {
        console.log(filmList);
        this.updateFilmList(filmList.results);
      }),
      catchError( (error) => error)
    );

  }

  public getMoreFilms(): any {
    this.count++;
    return this.http.get(`${this.nextPagePopularFilmUrl}${this.count}`);
  }

  public updateFilmList(list: FilmListInterface[]): void {
    if (list && list.length) {
      const result = [...new Set([...this.filmListArray, ...list])];
      console.log(result);

      localStorage.setItem('filmListArray', JSON.stringify(result));

      this.filmList$.next(result);
    }
  }

  public updateFilmListAfterSearch(result: FilmListInterface[]): void {
    console.log('search result: ', result);
    if (result && result.length) {
      this.filmList$.next(result);
    } else {
      console.log('no results');
      this.filmList$.next([]);
    }
  }

  public get getFilmList(): Observable<FilmListInterface[]> {
    return this.filmList$.asObservable();
  }

  public get getGenresList(): Observable<GenresListInterface[]> {
    return this.genresList$.asObservable();
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
        this.genresList$.next(genres.genres);
      }),
      catchError( (error) => error)
    );
  }

  public getFilmById(id: number): Observable<any> {
    return this.http.get(`${this.movieUrl}${id}?api_key=${this.apiKey}&language=uk-UA`).pipe(
      tap((currentFilm: FilmListInterface) => {
        this.currentFilm$.next(currentFilm);
      }),
      catchError( (error) => {
        console.log('ERROR GET FILM');
        this.router.navigate(['/', 'main']);
        // TODO show notification modal for few seconds and redirect to main page
        return error;
      })
    );
  }

  public getFilmObservable(): Observable<FilmListInterface> {
    return this.currentFilm$.asObservable();
  }

}
