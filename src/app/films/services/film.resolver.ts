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

  resolve(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.fetchData().subscribe(() => resolve(true));
    });
  }

  fetchData(): Observable<any> {
    return this.filmService.initFilmList().pipe(
      switchMap(() => {
        return this.filmService.initGenresList();
      }),
      catchError(async err => {
        console.log(err);
        await this.router.navigate(['/', 'main']);
        return of(false);
      })
    );
  }
}
