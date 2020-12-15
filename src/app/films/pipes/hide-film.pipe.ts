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
        console.log(film);
        // TODO problem below
        return arrayOfFilteredFilms.indexOf(film.id !== -1);
      });

      console.log('filteredFilms: ', filteredFilms);

      localStorage.setItem('filmListArray', JSON.stringify(filteredFilms));

      return filteredFilms;
    } else {
      return films;
    }
  }

}
