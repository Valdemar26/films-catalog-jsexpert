import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { FilmService } from '../../services/film.service';
import { GenresListInterface } from '../../interfaces/genres-list.interface';
import { FilmListInterface } from '../../interfaces/film-list.interface';


@Component({
  selector: 'exp-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  constructor(
    private dataService: FilmService,
  ) {
  }

  public ngOnInit(): void {
    this.initFilmListAndGenres();
  }

  public get getFilmsList(): Observable<FilmListInterface[]> {
    return this.dataService.getFilmList;
  }

  public get getGenresList(): Observable<GenresListInterface[]> {
    return this.dataService.getGenresList;
  }

  public setFavoriteFilm(film: FilmListInterface): void {
    this.dataService.setFavoriteFilm(film);
  }

  public loadMoreFilms(): void {
    this.dataService.getMoreFilms();
  }

  public identify(index, item): number {
    return item.id;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initFilmListAndGenres(): void {
    this.subscription.add(
      this.dataService.initFilmList()
        .subscribe()
    );

    this.subscription.add(
      this.dataService.initGenresList()
        .subscribe()
    );
  }

}
