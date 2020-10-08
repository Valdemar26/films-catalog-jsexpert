import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isLoading$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  public show(): void {
    this.isLoading$.next(true);
  }

  public hide(): void {
    this.isLoading$.next(false);
  }

  public getLoadingStatus(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }
}
