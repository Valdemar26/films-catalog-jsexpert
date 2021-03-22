import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment.prod';
import { ActorListInterface } from '../interfaces/actor-list.interface';
import { ActorInterface } from '../interfaces/actor.interface';


@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private count = 1;

  private apiKey = environment.movieDbApiKey;
  private popularActorUrl = `https://api.themoviedb.org/3/person/popular?api_key=${this.apiKey}&language=uk-UA&page=1`;
  private nextPagePopularActorUrl = `https://api.themoviedb.org/3/person/popular?api_key=${this.apiKey}&language=uk-UA&page=`;
  private actorUrl = 'https://api.themoviedb.org/3/person/';

  public actorList$: BehaviorSubject<ActorListInterface[]> = new BehaviorSubject<ActorListInterface[]>(null);
  private actorListArray: ActorListInterface[] = [];

  private currentActor$: Subject<ActorListInterface> = new Subject<ActorListInterface>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

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

  public getActorObservable(): Observable<ActorListInterface> {
    return this.currentActor$.asObservable();
  }

  public get getActorList(): Observable<ActorListInterface[]> {
    return this.actorList$.asObservable();
  }

  public getActorById(id: number): Observable<any> {

    return this.http.get(`${this.actorUrl}${id}?api_key=${this.apiKey}`).pipe(
      tap((currentActor: ActorListInterface) => {
        this.currentActor$.next(currentActor);
      }),
      catchError( (error) => {
        console.log('ERROR GET ACTOR');
        this.router.navigate(['/', 'main']);
        // TODO show error tooltip for few seconds and redirect to main page
        return error;
      })
    );
  }
}
