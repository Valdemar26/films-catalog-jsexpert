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
  private popularFilmUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=uk-UA&page=1`;
  constructor(private http: HttpClient) { }

  public getFilmList(): Observable<any> {
    return this.http.get(this.popularFilmUrl).pipe(
      delay(2000)
    );
  }
}
