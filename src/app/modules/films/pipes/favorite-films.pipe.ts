import { Pipe, PipeTransform } from '@angular/core';

import { FilmListInterface } from '../interfaces/film-list.interface';

@Pipe({
  name: 'favoriteFilms'
})
export class FavoriteFilmsPipe implements PipeTransform {

  transform(films: FilmListInterface[]): FilmListInterface[] {
    return films.filter((film: FilmListInterface) => film.isFavorite);
  }

}
