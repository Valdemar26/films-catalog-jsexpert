import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { catchError, delay, switchMap } from 'rxjs/operators';
import { FilmService } from './film.service';

@Injectable({
  providedIn: 'root'
})
export class FilmsResolver implements Resolve<boolean> {

  constructor(private router: Router, private filmService: FilmService) {}

  resolve(): Observable<boolean> {
    return this.fetchData();
  }

  fetchData(): Observable<boolean> {
    return this.filmService.initFilmList().pipe(
      switchMap(() => {
        return this.filmService.initGenresList();
      }),
      catchError(async err => {
        console.log(err);
        await this.router.navigate(['/', 'main']);
        // TODO call service to show "error" modal
        return of(false);
      })
    );
  }
}
