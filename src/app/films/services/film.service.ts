import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { GenresListInterface } from '../interfaces/genres-list.interface';
import { GenresInterface } from '../interfaces/genres.interface';
import { FilmListInterface } from '../interfaces/film-list.interface';
import { FilmInterface } from '../interfaces/film.interface';


@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private apiKey = environment.movieDbApiKey;

  private popularFilmUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=uk-UA&page=1`;
  private nextPagePopularFilmUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=uk-UA&page=`;
  private genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=uk-UA`;

  private count = 1;

  public filmList$: BehaviorSubject<FilmListInterface[]> = new BehaviorSubject<FilmListInterface[]>(null);
  private filmListArray: FilmListInterface[] = [];

  private genresList$: BehaviorSubject<any[]> = new BehaviorSubject(null);

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

  public getMoreFilms(): any {
    this.count++;
    return this.http.get(`${this.nextPagePopularFilmUrl}${this.count}`);
  }

  public updateFilmList(list: FilmListInterface[]): void {
    if (list && list.length) {
      this.filmListArray = this.filmListArray.concat(list);

      this.filmList$.next(this.filmListArray);
    }
  }

  public updateFilmListAfterSearch(result: FilmListInterface[]): void {
    console.log('search result: ', result);
    if (result && result.length) {
      this.filmList$.next(result);
    } else {
      // TODO show block 'no results'
      console.log('no results');
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

  public getFilmById(id: number): any {
    if (this.filmListArray && this.filmListArray.length) {
      const currentFilm = this.filmListArray.find((film: FilmListInterface) => film.id === Number(id));
      this.currentFilm$.next(currentFilm);
    }
  }

  public getFilmObservable(): Observable<FilmListInterface> {
    return this.currentFilm$.asObservable();
  }

}
