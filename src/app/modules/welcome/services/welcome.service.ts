import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  private apiKey = environment.movieDbApiKey;
  private themoviedbUrl = `https://api.themoviedb.org/3`;

  constructor(private http: HttpClient) { }

  public getWelcomeFilms(): Observable<any> {
    return this.http.get(`${this.themoviedbUrl}/movie/popular?page=1&api_key=${this.apiKey}&language=uk-UK`);
  }

  public getWelcomeActors(): Observable<any> {
    return this.http.get(`${this.themoviedbUrl}/person/popular?page=1&api_key=${this.apiKey}&language=uk-UK`);
  }


}
