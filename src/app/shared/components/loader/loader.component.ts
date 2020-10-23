import {Component, OnDestroy, OnInit} from '@angular/core';

import { Subscription } from 'rxjs';

import { LoaderService } from '../../services/loader.service';


@Component({
  selector: 'exp-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  public isLoaderShown: boolean;
  private subscription: Subscription = new Subscription();

  constructor(private loaderService: LoaderService) { }

  public ngOnInit(): void {
    this.checkLoading();
  }

  private checkLoading(): void {
    const loaderSubscription = this.loaderService.getLoadingStatus().subscribe((status: boolean) => {
      console.log('loader status: ', status);  // todo check this!!!!
      this.isLoaderShown = status;
    });

    this.subscription.add(loaderSubscription);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
