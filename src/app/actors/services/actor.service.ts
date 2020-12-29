import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';
import { ActorListInterface } from '../interfaces/actor-list.interface';
import {FilmListInterface} from "../../films/interfaces/film-list.interface";
import {ActorInterface} from "../interfaces/actor.interface";


@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private count = 1;

  private apiKey = environment.movieDbApiKey;
  private popularActorUrl = `https://api.themoviedb.org/3/person/popular?api_key=${this.apiKey}&language=uk-UA&page=1`;
  private nextPagePopularActorUrl = `https://api.themoviedb.org/3/person/popular?api_key=${this.apiKey}&language=uk-UA&page=`;

  public actorList$: BehaviorSubject<ActorListInterface[]> = new BehaviorSubject<ActorListInterface[]>(null);
  private actorListArray: ActorListInterface[] = [];

  constructor(private http: HttpClient) { }

  public initActorList(): Observable<any> {

    const actorsFromStorage = JSON.parse(localStorage.getItem('actorListArray'));

    if (actorsFromStorage && actorsFromStorage.length) {
      this.actorListArray = actorsFromStorage;

      this.updateActorList(this.actorListArray);
      return of(false);
    } else {
      return this.http.get(this.popularActorUrl).pipe(
        tap((actorList: ActorInterface) => {
          this.actorListArray = actorList.results.map((actor: ActorListInterface) => ({...actor, isFavorite: false}));

          this.updateActorList(this.actorListArray);
          localStorage.setItem('actorListArray', JSON.stringify(this.actorListArray));
        }),
        catchError((error) => error)
      );
    }
  }

  public updateActorList(list: ActorListInterface[]): void {

    if (list && list.length) {
      const result = [...this.actorListArray, ...list];

      const unique = [];
      result.forEach(film => unique.filter(f => f.id === film.id).length > 0 ? null : unique.push(film));

      localStorage.setItem('actorListArray', JSON.stringify(unique));
      this.actorList$.next(unique);
    }
  }

  public getMoreActors(): any {
    this.count++;
    return this.http.get(`${this.nextPagePopularActorUrl}${this.count}`);
  }

  public get getActorList(): Observable<ActorListInterface[]> {
    return this.actorList$.asObservable();
  }
}
