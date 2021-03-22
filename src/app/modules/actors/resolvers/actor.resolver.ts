import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { Observable, of } from 'rxjs';
import {catchError, delay, tap} from 'rxjs/operators';

import { LoaderService } from '../../../shared/services/loader.service';
import { ActorService } from '../services/actor.service';


@Injectable({
  providedIn: 'root'
})
export class ActorResolver implements Resolve<boolean> {

  constructor(
    private router: Router,
    private actorService: ActorService,
    private loaderService: LoaderService
  ) {
  }

  resolve(): Observable<boolean> {
    return this.fetchData();
  }

  fetchData(): Observable<boolean> {
    this.loaderService.show();

    return this.actorService.initActorList().pipe(
      delay(800),
      tap(() => this.loaderService.hide()),
      catchError(async err => {
        console.log('actor resolver error: ', err);
        await this.router.navigate(['/', 'main']);
        // TODO call service to show "error" tooltip
        return of(false);
      })
    );
  }
}
