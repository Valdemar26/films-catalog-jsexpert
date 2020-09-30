import { Component, OnInit } from '@angular/core';

import { FilmService } from '../services/film.service';
import { FilmInterface } from '../interfaces/film.interface';


@Component({
  selector: 'exp-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit {

  public filmsList: FilmInterface[];


  constructor(private filmsService: FilmService) {
  }

  public ngOnInit(): void {
    this.initFilmsList();
  }

  private initFilmsList(): void {
    this.filmsList = this.filmsService.initFilms();
  }

}
