import {Component, OnInit} from '@angular/core';

import { Observable } from 'rxjs';

import { ThemesService } from './films/services/themes.service';

@Component({
  selector: 'exp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isDarkTheme: Observable<boolean>;

  constructor(private themeService: ThemesService) {}

  public ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

}
