import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

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

  // public setFavoriteFilm(favorite: FilmInterface): Map<any, any> {
  //   favorite.isFavorite ? this.favoriteFilms.set(favorite.title, favorite) : this.favoriteFilms.delete(favorite.title);
  //
  //   this.favoriteFilmsCount$.next(Array.from(this.favoriteFilms.keys()).length);
  //
  //   localStorage.setItem('favoriteFilms', JSON.stringify([...this.favoriteFilms.keys()]));
  //   return this.favoriteFilms;
  // }

  // public getFavoriteFilm(): Observable<number> {
  //
  //   if (DataService.getItemFromLocalStorage()) {
  //     const favoriteFilmsArray = DataService.getItemFromLocalStorage();
  //     const counter = JSON.parse(favoriteFilmsArray).length;
  //     this.setCountFavoriteFilm(counter);
  //     return of(counter);
  //   } else {
  //     return of(null);
  //   }
  //
  // }

  // public getCountFavoriteFilm(): Observable<number> {
  //   return this.favoriteFilmsCount$.asObservable();
  // }
  //
  // public setCountFavoriteFilm(countFilms: number): void {
  //   this.favoriteFilmsCount$.next(countFilms);
  // }

  public sortFilmByTitle(value): Subscription {
    const direction = !!parseInt(value, 10) ? -1 : 1;

    return this.getFilmList.subscribe((films: FilmInterface[]) => {
      return films.sort((a: FilmInterface, b: FilmInterface) => direction * (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
    });
  }

  public getGenres(): any {
    return this.http.get(this.genresUrl);
  }
}
