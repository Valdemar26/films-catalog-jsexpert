import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment.prod';
import {BehaviorSubject, Observable} from "rxjs";
import {CommentsInterface} from "../../shared/interfaces/comments.interface";

@Injectable({
  providedIn: 'root'
})
export class FilmDetailService {

  private apiKey = environment.movieDbApiKey;
  private themoviedbUrl = `https://api.themoviedb.org/3/movie/`;
  private trailerUrl = `http://api.themoviedb.org/3/movie/`;

  public commentsList$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private commentsListArray: CommentsInterface[] = [];

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

  public getFilmReviews(id: number): any {
    return this.http.get(`${this.themoviedbUrl}${id}/reviews?api_key=${this.apiKey}`);
  }

  public updateCommentsList(comment: CommentsInterface[]): void {
    console.log(comment);

    if (localStorage.getItem('comments')) {
      this.commentsListArray = JSON.parse(localStorage.getItem('comments'));
    }

    if (comment && Object.keys(comment).length) {

      const result = [this.commentsListArray, comment];  // TODO fix this line!

      localStorage.setItem('comments', JSON.stringify([...result]));
      this.commentsList$.next(result);

    }
  }

  public get getComments(): Observable<any> {
    return this.commentsList$.asObservable();
  }

  // todo get genres, budget, same films
}
