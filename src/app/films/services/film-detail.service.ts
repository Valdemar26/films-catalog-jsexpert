import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FilmDetailService {

  private apiKey = environment.movieDbApiKey;
  private themoviedbUrl = `https://api.themoviedb.org/3/movie/`;
  private trailerUrl = `http://api.themoviedb.org/3/movie/`;

  constructor(private http: HttpClient) { }

  public getFilmHeroes(id: number): any {
    return this.http.get(`${this.themoviedbUrl}${id}/credits?api_key=${this.apiKey}`);
  }

  public getTrailerByFilmId(id: number): any {
    return this.http.get(`${this.trailerUrl}${id}/videos?api_key=${this.apiKey}`);
  }

  public getSimilarFilmsById(id: number): any {
    return this.http.get(`${this.themoviedbUrl}${id}/similar?api_key=${this.apiKey}&language=uk-UA&page=1`);
  }

  // todo get genres, budget, same films
}
