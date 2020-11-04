import { Component, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { FilmService } from '../../services/film.service';
import { FavoriteFilmsService } from '../../services/favorite-films.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { GenresListInterface } from '../../interfaces/genres-list.interface';
import { FilmListInterface } from '../../interfaces/film-list.interface';
import { FilmInterface} from '../../interfaces/film.interface';


@Component({
  selector: 'exp-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnDestroy {

  public isButtonDisabled: boolean;
  private subscription: Subscription = new Subscription();

  constructor(
    private filmService: FilmService,
    private favoriteFilmsService: FavoriteFilmsService,
    private loaderService: LoaderService
  ) {
    this.getFromLocalStorage();
  }

  public get getFilmList(): Observable<FilmListInterface[]> {
    return this.filmService.getFilmList;
  }

  public get getGenresList(): Observable<GenresListInterface[]> {
    return this.filmService.getGenresList;
  }

  public setFavoriteFilm(film: FilmListInterface): void {
    this.favoriteFilmsService.setFavoriteFilm(film);
  }

  public loadMoreFilms(): void {
    this.filmService.getMoreFilms()
      .pipe(
        tap(() => {
          this.isButtonDisabled = true;
          this.loaderService.show();
        }),
        delay(1000),
        tap(() => {
          this.isButtonDisabled = false;
          this.loaderService.hide();
        })
      )
      .subscribe((films: FilmInterface) => this.filmService.updateFilmList(films.results));
  }

  public identify(index, item): number {
    return item.id;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getFromLocalStorage(): void {
    if (localStorage.getItem('favoriteFilmsList')) {
      const favoriteFilms = JSON.parse(localStorage.getItem('favoriteFilmsList'));
      console.log(favoriteFilms);
    }  // TODO merge two arrays
  }
}
