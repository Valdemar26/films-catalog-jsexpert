import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

import { Subscription} from 'rxjs';

import { FilmService } from '../../../../services/film.service';
import { FilmDetailService } from '../../../../services/film-detail.service';


import { ModalComponent } from '../../../../../shared/components/modal/modal.component';
import { FilmListInterface } from '../../../../interfaces/film-list.interface';


@Component({
  selector: 'exp-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit, OnDestroy {

  @ViewChild('modalContainer', { read: ViewContainerRef }) container;
  componentRef: ComponentRef<any>;

  public filmDetail: FilmListInterface;

  public imagePath = 'https://image.tmdb.org/t/p/w500';
  public backdropPath = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/';

  public trailerPath;

  private filmId: number;
  private subscription: Subscription = new Subscription();

  public heroesList;
  public similarList;


  constructor(
    private filmService: FilmService,
    private filmDetailService: FilmDetailService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private sanitizer: DomSanitizer,
    private resolver: ComponentFactoryResolver
    ) { }

  public ngOnInit(): void {
    window.scroll(0, 0);

    this.initFilmSubscription();
    this.getFilmIdFromUrl();
    this.initFilmDetail();
    this.initFilmHeroes();
    this.getFilmTrailer();
    this.getSimilarFilms();
  }

  public initFilmDetail(): void {
    this.filmService.getFilmById(this.filmId).subscribe();
  }

  public back(): void {
    this.router.navigate(['/films']);
  }

  public openTrailerModal(): void {
    this.container.clear();
    const factory = this.resolver.resolveComponentFactory(ModalComponent);
    this.componentRef = this.container.createComponent(factory);

    this.componentRef.instance.parentRef = this.componentRef;

    this.componentRef.instance.trailerPath = this.trailerPath;
    this.componentRef.instance.filmTitle = this.filmDetail.original_title;
  }

  public modalClosed(isClosed): void {
    console.log(isClosed);
    this.container.clear();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();

    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  private initFilmSubscription(): void {
    const filmSubscription = this.filmService.getFilmObservable().subscribe((film: FilmListInterface) => {
      if (film) {
        this.filmDetail = film;
      }
    });

    this.subscription.add(filmSubscription);
  }

  private initFilmHeroes(): void {
    const heroesSubscription = this.filmDetailService.getFilmHeroes(this.filmId)
      .subscribe((heroes) => this.heroesList = heroes.cast);

    this.subscription.add(heroesSubscription);
  }

  private getFilmTrailer(): void {

    const trailerSubscription = this.filmDetailService.getTrailerByFilmId(this.filmId)
      .subscribe((trailer) => {
        const youtubeId = trailer.results[0].key;  // TODO fix bug 'Cannot read property 'key' of undefined'
        const youtubePath = 'https://www.youtube.com/embed/';

        this.trailerPath = `${youtubePath}${youtubeId}`;
      });

    this.subscription.add(trailerSubscription);
  }

  private getFilmIdFromUrl(): number {
    return this.filmId = this.route.snapshot.params['id'];
  }

  private getSimilarFilms(): any {

    const similarFilmsSubscription = this.filmDetailService.getSimilarFilmsById(this.filmId)
      .subscribe((similar) => {
        this.similarList = similar.results;
      });

    this.subscription.add(similarFilmsSubscription);
  }

}
