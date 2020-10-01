import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FilmInterface } from '../../interfaces/film.interface';

@Component({
  selector: 'exp-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.scss']
})
export class FilmItemComponent implements OnInit {

  @Input() film: FilmInterface;

  @Output() counter: EventEmitter<boolean> = new EventEmitter<boolean>();

  public isFavoriteFilm: boolean;

  constructor() { }

  public ngOnInit(): void {}

  public addToFavorite(): void {
    this.counter.emit(true);

    this.isFavoriteFilm = !this.isFavoriteFilm;
  }

  public removeFromFavorite(): void {
    this.counter.emit(false);

    this.isFavoriteFilm = !this.isFavoriteFilm;
  }

}
