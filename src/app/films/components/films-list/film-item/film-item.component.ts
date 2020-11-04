import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { from, Subscription } from 'rxjs';
import { FilmListInterface } from '../../../interfaces/film-list.interface';
import { FilmService } from '../../../services/film.service';
import { filter, switchMap } from 'rxjs/operators';


@Component({
  selector: 'exp-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.scss']
})
export class FilmItemComponent implements OnInit, OnDestroy {

  @Input() set filmList(value: FilmListInterface) {
    this.film = value;
  }

  @Input() genresList: any;

  @Output() favoriteFilm: EventEmitter<FilmListInterface> = new EventEmitter<FilmListInterface>();

  public film: FilmListInterface;
  public imagePath: string;
  public genres = [];
  public genresId: number;

  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private filmService: FilmService) { }

  public ngOnInit(): void {
    this.fetchPosterPath();
    this.fetchGenres();
  }

  private fetchPosterPath(): string {
    return this.imagePath = 'https://image.tmdb.org/t/p/w500' + this.film.poster_path;
  }

  public toggleFavoriteFilm(favoriteFilm: FilmListInterface): void {

    favoriteFilm.isFavorite = !favoriteFilm.isFavorite;

    this.favoriteFilm.emit(favoriteFilm);
  }

  public openFilm(film: FilmListInterface): any {
    this.router.navigate(['/films/' + film.id]);
  }

  public sortByGenres(id: number): void {
    console.log('id: ', id);
    this.genresId = id;
    const genresArray = [];

    this.filmService.getFilmList.pipe(
      switchMap((items: FilmListInterface[]) => {
        return from(items);
      }),
      filter((film) => {
        console.log(film.genre_ids.indexOf(id) > 0);
        return film.genre_ids.indexOf(id) > 0;
      })
    ).subscribe((data) => {
      console.log(data);  // DOESN'T GET DATA
      genresArray.push(data);
    });

    this.filmService.filmList$.next([...new Set(genresArray)]);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private fetchGenres(): void {
    this.film.genre_ids.forEach((genre: number) => {

      const item = this.genresList.filter((x) => x.id === genre);

      if (item.length) {
        this.genres.push(item[0]);
      }
    });
  }
}
