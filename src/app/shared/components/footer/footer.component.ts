import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ThemeService} from '../../../films/services/themes.service';

@Component({
  selector: 'exp-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public isDarkTheme: Observable<boolean>;

  constructor(private themeService: ThemeService) { }

  public ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  public toggleDarkTheme(checked: boolean): void {
    this.themeService.setDarkTheme(checked);
  }


}
