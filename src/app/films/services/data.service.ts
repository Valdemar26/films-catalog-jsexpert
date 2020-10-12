import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';
import { FilmInterface } from '../interfaces/film.interface';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiKey = environment.movieDbApiKey;
  private popularFilmUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=uk-UA&page=1`;
  private nextPagePopularFilmUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=uk-UA&page=`;
  private genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=uk-UA`;
  private count = 1;

  private filmList$: BehaviorSubject<FilmInterface[]> = new BehaviorSubject(null);
  private filmListArray: FilmInterface[] = [];

  private favoriteFilmsCount$: Subject<number> = new Subject();
  private favoriteFilmsArray = [];

  private currentFilm$: Subject<FilmInterface> = new Subject<FilmInterface>();

  constructor(private http: HttpClient) { }

  public initFilmList(): Observable<any> {

    return this.http.get(this.popularFilmUrl).pipe(
      map((filmList: any) => {

        const transformedFilmList = filmList.results.map((film: FilmInterface) => film);

        return {...filmList, results: transformedFilmList};
      }),
      catchError( (error) => error)
    );
  }

  public getMoreFilms(): Subscription {
    this.count++;
    return this.http.get(`${this.nextPagePopularFilmUrl}${this.count}`)
      .subscribe((films: any) => {
        this.updateFilmList(films.results);
      });
  }

  public updateFilmList(value: FilmInterface[]): void {
    if (value && value.length) {
      value.forEach((val) => this.filmListArray.push(val));
      this.filmList$.next(this.filmListArray);

      console.log('films: ', this.filmListArray);
    }
  }

  public get getFilmList(): Observable<FilmInterface[]> {
    return this.filmList$.asObservable();
  }

  public setFavoriteFilm(film: FilmInterface): void {
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

    return this.getFilmList.subscribe((films: FilmInterface[]) => {
      return films.sort((a: FilmInterface, b: FilmInterface) => direction * (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
    });
  }

  public getGenres(): any {
    return this.http.get(this.genresUrl);
  }

  public getFilmById(id: number): any {
    this.getFilmList.subscribe((filmList: FilmInterface[]) => {
      this.filmListArray = filmList;
    });
    const currentFilm = this.filmListArray.find((film: FilmInterface) => film.id === Number(id));
    this.currentFilm$.next(currentFilm);
  }

  public getFilmObservable(): Observable<FilmInterface> {
    return this.currentFilm$.asObservable();
  }

  // public getFullFilmInfo(): Observable<any> {
  //   // todo remove or rewrite method
  //   return this.http.get('https://api.themoviedb.org/3/movie/497582?&api_key=0994e7679a856150aadcecf7de489bce&language=uk-UK');
  // }
}
