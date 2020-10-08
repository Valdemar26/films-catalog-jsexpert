import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'exp-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  public isLoaderShown: boolean;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.checkLoading();
  }

  private checkLoading(): Subscription {
    return this.loaderService.getLoadingStatus().subscribe((status: boolean) => {
      this.isLoaderShown = status;
    });
  }

}
