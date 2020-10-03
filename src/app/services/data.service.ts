import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiKey = environment.movieDbApiKey;
  private popularFilmUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=uk-UA&page=2`;
  constructor(private http: HttpClient) { }

  public getFilmList(): Observable<any> {
    return this.http.get(this.popularFilmUrl).pipe(
      delay(700)
    );
  }

  // todo add film to favorite and save in LocalStorage
  public setFavoriteFilm(favorite): Observable<number> {
    console.log(favorite);
    return null;
  }

  // todo create search film method
  public searchFilmByTitle(): void {

  }

  // todo sort film method
  public sortFilmByTitle(): void {

  }
}
