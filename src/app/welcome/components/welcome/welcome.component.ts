import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { WelcomeService } from '../../services/welcome.service';
import { FilmListInterface } from '../../../films/interfaces/film-list.interface';
import { FilmInterface } from '../../../films/interfaces/film.interface';


@Component({
  selector: 'exp-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public welcomeFilms: FilmListInterface[] = [];
  public imagePath = 'https://image.tmdb.org/t/p/original';

  private subscription: Subscription = new Subscription();

  constructor(
    private welcomeService: WelcomeService
  ) { }

  public ngOnInit(): void {
    this.initWelcomeFilms();
  }

  public openFilm(): void {

  }

  private initWelcomeFilms(): void {
    const filmsSubscription = this.welcomeService.getWelcomeFilms()
      .subscribe((films: FilmInterface) => this.welcomeFilms = films.results);

    this.subscription.add(filmsSubscription);
  }
}
