import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ThemesService {
  private darkTheme = new Subject<boolean>();
  isDarkTheme = this.darkTheme.asObservable();

  setDarkTheme(isDarkTheme: boolean): void {
    this.darkTheme.next(isDarkTheme);
  }
}
