import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FilmInterface } from '../../../../film-catalog/interfaces/film.interface';

@Component({
  selector: 'exp-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.scss']
})
export class FilmItemComponent implements OnInit {

  @Input() film: FilmInterface;

  @Output() favoriteFilm: EventEmitter<FilmInterface> = new EventEmitter<FilmInterface>();

  public isFavoriteFilm: boolean;
  public imagePath: string;

  constructor() { }

  public ngOnInit(): void {
    this.imagePath = 'https://image.tmdb.org/t/p/w500' + this.film.poster_path;
  }

  public toggleFavoriteFilm(favoriteFilm: FilmInterface): void {
    this.isFavoriteFilm = !this.isFavoriteFilm;
    favoriteFilm.isFavorite = this.isFavoriteFilm;
    this.favoriteFilm.emit(favoriteFilm);
  }

}
