import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { FilmInterface } from '../../interfaces/film.interface';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'exp-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit, OnDestroy {

  public genresList = [];

  private subscription: Subscription = new Subscription();

  constructor(
    private dataService: DataService,
  ) {
  }

  public ngOnInit(): void {
    this.initFilmsList();
    this.initGenresList();
  }

  public get getFilmsList(): Observable<FilmInterface[]> {
    return this.dataService.getFilmList;
  }

  public setFavoriteFilm(film: FilmInterface): void {
    this.dataService.setFavoriteFilm(film);
  }

  public loadMoreFilms(): void {
    this.dataService.getMoreFilms();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initFilmsList(): void {
    const filmsSubscription = this.dataService.initFilmList().pipe(
      map(({results}) => {
        return results;
      })
    ).subscribe((films: FilmInterface[]) => this.dataService.updateFilmList(films));

    this.subscription.add(filmsSubscription);
  }

  private initGenresList(): void {
    const genresSubscription = this.dataService.getGenres()
      .subscribe((genres) => {
        this.genresList = genres.genres;
      });

    this.subscription.add(genresSubscription);
  }

}
