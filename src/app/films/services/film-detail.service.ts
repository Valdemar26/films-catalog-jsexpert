import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';

import { environment } from '../../../environments/environment.prod';
import { CommentsInterface } from '../../shared/interfaces/comments.interface';

@Injectable({
  providedIn: 'root'
})
export class FilmDetailService {

  private apiKey = environment.movieDbApiKey;
  private themoviedbUrl = `https://api.themoviedb.org/3/movie/`;
  private trailerUrl = `http://api.themoviedb.org/3/movie/`;

  public commentsList$: BehaviorSubject<CommentsInterface[]> = new BehaviorSubject<CommentsInterface[]>([]);
  private commentsListArray: CommentsInterface[] = [];

  public replyList$: BehaviorSubject<CommentsInterface[]> = new BehaviorSubject<CommentsInterface[]>([]);
  private replyListArray: any[] = [];

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

  public getCommentsFromStorage(id: number): CommentsInterface[] {
    const commentsFromStorage = localStorage.getItem(`comments-${id}`);
    return commentsFromStorage ? JSON.parse(commentsFromStorage) : [];
  }

  public initCommentsList(id: number): void {
    this.commentsList$.next(this.getCommentsFromStorage(id));
  }

  public updateCommentsList(id: number, comment?: CommentsInterface): void {

    if (comment && Object.keys(comment).length) {
      this.commentsListArray = this.getCommentsFromStorage(id);
      this.commentsListArray.push(comment);
      localStorage.setItem(`comments-${id}`, JSON.stringify(this.commentsListArray));
      this.commentsList$.next(this.commentsListArray);
      this.replyList$.next(this.commentsListArray);
    }
  }

  public updateReplyList(id: number, replyId: number, reply?: CommentsInterface): void {

    const commentsFromStorage = JSON.parse(localStorage.getItem(`comments-${id}`));

    const repliedComment = commentsFromStorage.filter((singleComment: CommentsInterface) => singleComment.commentId === replyId);

    if (repliedComment[0].reply) {
      repliedComment[0].reply.push(reply);
    } else {
      repliedComment[0].reply = [];
      repliedComment[0].reply.push(reply);
    }

    localStorage.setItem(`comments-${id}`, JSON.stringify([...commentsFromStorage]));
  }

  public get getComments(): Observable<any> {
    return this.commentsList$.asObservable();
  }

  public get getReplyToComments(): Observable<any> {
    return this.replyList$.asObservable();
  }
}
