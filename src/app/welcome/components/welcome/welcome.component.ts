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

  private initWelcomeFilms(): void {
    const filmsSubscription = this.welcomeService.getWelcomeFilms()
      .subscribe((films: FilmInterface) => this.welcomeFilms = films.results);

    this.subscription.add(filmsSubscription);
  }

  private initWelcomeActors(): void {
    const actorsSubscription = this.welcomeService.getWelcomeActors()
      .subscribe((actors: any) => {
        this.welcomeActors = actors.results;
      });

    this.subscription.add(actorsSubscription);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public openActor(actor): void {

  }
}
