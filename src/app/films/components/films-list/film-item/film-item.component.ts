import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import {FilmListInterface} from '../../../interfaces/film-list.interface';



@Component({
  selector: 'exp-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.scss']
})
export class FilmItemComponent implements OnInit, OnDestroy {

  @Input() film: FilmListInterface;
  @Input() genresList: any;

  @Output() favoriteFilm: EventEmitter<FilmListInterface> = new EventEmitter<FilmListInterface>();

  public imagePath: string;
  public genres = [];

  private subscription: Subscription = new Subscription();

  constructor(private router: Router) { }

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

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private fetchGenres(): void {
    this.film.genre_ids.forEach((genre: number) => {

      const item = this.genresList.filter((x) => x.id === genre);

      if (item.length) {
        this.genres.push(item[0].name);
      }
    });
  }

  public openFilm(film: FilmListInterface): any {
    this.router.navigate(['/films/' + film.id]);
  }
}
