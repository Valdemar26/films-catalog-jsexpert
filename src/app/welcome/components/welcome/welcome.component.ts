import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { WelcomeService } from '../../services/welcome.service';
import { FilmListInterface } from '../../../films/interfaces/film-list.interface';
import { FilmInterface } from '../../../films/interfaces/film.interface';


@Component({
  selector: 'exp-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  public welcomeFilms: FilmListInterface[] = [];
  public welcomeActors = [];

  public imagePath = 'https://image.tmdb.org/t/p/w500';

  private subscription: Subscription = new Subscription();

  constructor(
    private welcomeService: WelcomeService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.initWelcomeFilms();
    this.initWelcomeActors();
  }

  public openFilm(film: FilmListInterface): void {
    this.router.navigate(['/films/' + film.id]);
  }

  public openActor(actor): void {
    this.router.navigate(['/actors/' + actor.id]);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initWelcomeFilms(): void {

    if (localStorage.getItem('popularMovie')) {
      this.welcomeFilms = JSON.parse(localStorage.getItem('popularMovie'));
    } else {
      const filmsSubscription = this.welcomeService.getWelcomeFilms()
        .subscribe((films: FilmInterface) => {
          localStorage.setItem('popularMovie', JSON.stringify(films.results));
          this.welcomeFilms = films.results;
        });

      this.subscription.add(filmsSubscription);
    }
  }

  private initWelcomeActors(): void {

    if (localStorage.getItem('popularActors')) {
      this.welcomeActors = JSON.parse(localStorage.getItem('popularActors'));
    } else {
      const actorsSubscription = this.welcomeService.getWelcomeActors()
        .subscribe((actors: any) => {
          localStorage.setItem('popularActors', JSON.stringify(actors.results));
          this.welcomeActors = actors.results;
        });

      this.subscription.add(actorsSubscription);
    }
  }
}
