import { Pipe, PipeTransform } from '@angular/core';

import { FilmListInterface } from '../interfaces/film-list.interface';


@Pipe({
  name: 'hideFilm'
})
export class HideFilmPipe implements PipeTransform {

  transform(films: FilmListInterface[]): FilmListInterface[] {

    const filteredFilmsArray = localStorage.getItem('filteredFilmsId');

    if (filteredFilmsArray && filteredFilmsArray.length) {
      const arrayOfFilteredFilms = JSON.parse(localStorage.getItem('filteredFilmsId'));

      const filteredFilms = films.filter((film) => {
        return arrayOfFilteredFilms.indexOf(film.id) === -1;
      });

      localStorage.setItem('filmListArray', JSON.stringify(filteredFilms));  // TODO need to be saved arrays of ids

      return filteredFilms;
    } else {
      return films;
    }
  }

}
