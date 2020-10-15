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

import { FilmInterface } from '../../../../interfaces/film.interface';
import { ModalComponent } from '../../../../../shared/components/modal/modal.component';


@Component({
  selector: 'exp-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit, OnDestroy {

  @ViewChild('modalContainer', { read: ViewContainerRef }) container;
  componentRef: ComponentRef<any>;

  public filmDetail: FilmInterface;

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
    this.initFilmSubscription();
    this.getFilmIdFromUrl();
    this.initFilmDetail();
    this.initFilmHeroes();
    this.getFilmTrailer();
    this.getSimilarFilms();

    // this.getFullFilmInfoById();
  }

  public initFilmDetail(): void {
    this.filmService.getFilmById(this.filmId);
  }

  public back(): void {
    this.location.back();
  }

  public openTrailerModal(): void {
    this.container.clear();
    const factory = this.resolver.resolveComponentFactory(ModalComponent);
    this.componentRef = this.container.createComponent(factory);

    this.componentRef.instance.trailerPath = this.trailerPath;
    this.componentRef.instance.filmTitle = this.filmDetail.original_title;
    this.componentRef.instance.output = this.modalClosed;
  }

  public modalClosed(isClosed): void {
    console.log(isClosed);
    this.container.clear();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.componentRef.destroy();
  }

  private initFilmSubscription(): void {
    const filmSubscription = this.filmService.getFilmObservable().subscribe((film: FilmInterface) => {
      if (film) {
        this.filmDetail = film;
      }
      console.log('filmDetail: ', this.filmDetail);
    });

    this.subscription.add(filmSubscription);
  }

  private initFilmHeroes(): void {
    const heroesSubscription = this.filmDetailService.getFilmHeroes(this.filmId)
      .subscribe((heroes) => {
        this.heroesList = heroes.cast;
        console.log(this.heroesList);
      });

    this.subscription.add(heroesSubscription);
  }

  private getFilmTrailer(): void {

    const trailerSubscription = this.filmDetailService.getTrailerByFilmId(this.filmId)
      .subscribe((trailer) => {
        const youtubeId = trailer.results[0].key;
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
