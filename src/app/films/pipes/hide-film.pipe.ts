import { Pipe, PipeTransform } from '@angular/core';

import { FilmListInterface } from '../interfaces/film-list.interface';
import { FilmService } from '../services/film.service';


@Pipe({
  name: 'hideFilm'
})
export class HideFilmPipe implements PipeTransform {

  constructor(private filmService: FilmService) {}

  transform(films: FilmListInterface[]): FilmListInterface[] {

    const filteredFilmsArray = localStorage.getItem('filteredFilmsId');

    if (filteredFilmsArray && filteredFilmsArray.length) {
      const arrayOfFilteredFilms = JSON.parse(localStorage.getItem('filteredFilmsId'));

      const filteredFilms = films.filter((film) => {
        return arrayOfFilteredFilms.indexOf(film.id) === -1;
      });

      localStorage.setItem('filmListArray', JSON.stringify(filteredFilms));
      this.filmService.filmList$.next(filteredFilms);

      return filteredFilms;
    } else {
      return films;
    }
  }

}
