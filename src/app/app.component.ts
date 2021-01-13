import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ThemesService } from './films/services/themes.service';

import { AuthService } from './service/auth.service';

@Component({
  selector: 'exp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isDarkTheme: Observable<boolean>;

  public email: string;
  public password: string;

  constructor(private themeService: ThemesService, public authService: AuthService) {}

  public ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  // AUTH
  public signup(): any {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  public login(): any {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';
  }

  public logout(): any {
    this.authService.logout();
  }

}
