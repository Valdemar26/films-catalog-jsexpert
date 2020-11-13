import { Pipe, PipeTransform } from '@angular/core';

import {FilmListInterface} from '../interfaces/film-list.interface';

@Pipe({
  name: 'favoriteFilms'
})
export class FavoriteFilmsPipe implements PipeTransform {

  transform(films: FilmListInterface[], ...args: unknown[]): unknown {
    const a = films.filter((film: FilmListInterface) => film.isFavorite);
    console.log(a);
    return films.filter((film: FilmListInterface) => film.isFavorite);
  }

}
