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
import {DomSanitizer} from '@angular/platform-browser';

import { Subscription} from 'rxjs';

import { FilmInterface } from '../../../../interfaces/film.interface';
import { DataService } from '../../../../services/data.service';
import {ModalComponent} from '../../../../../shared/components/modal/modal.component';


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


  constructor(
    private dataService: DataService,
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

    // this.getFullFilmInfoById();
  }

  private getFilmIdFromUrl(): number {
    return this.filmId = this.route.snapshot.params['id'];
  }

  public initFilmDetail(): void {
    this.dataService.getFilmById(this.filmId);
  }

  public back(): void {
    this.location.back();
  }

  public openTrailerModal(): void {
    console.log(this.trailerPath);

    this.container.clear();
    const factory = this.resolver.resolveComponentFactory(ModalComponent);
    this.componentRef = this.container.createComponent(factory);
    // this.componentRef.instance.type = type;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.componentRef.destroy();
  }

  private initFilmSubscription(): void {
    const filmSubscription = this.dataService.getFilmObservable().subscribe((film: FilmInterface) => {
      if (film) {
        this.filmDetail = film;
      }
      console.log('filmDetail: ', this.filmDetail);
    });

    this.subscription.add(filmSubscription);
  }

  private initFilmHeroes(): void {
    const heroesSubscription = this.dataService.getFilmHeroes(this.filmId)
      .subscribe((heroes) => {
        this.heroesList = heroes.cast;
        console.log(this.heroesList);
      });

    this.subscription.add(heroesSubscription);
  }

  private getFilmTrailer(): void {

    const trailerSubscription = this.dataService.getTrailerByFilmId(this.filmId)
      .subscribe((trailer) => {
        const youtubeId = trailer.results[0].key;
        const youtubePath = 'https://www.youtube.com/embed/';

        this.trailerPath = `${youtubePath}${youtubeId}`;
      });

    this.subscription.add(trailerSubscription);
  }

}
