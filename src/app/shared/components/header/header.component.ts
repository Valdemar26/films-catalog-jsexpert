import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { MenuItemInterface } from '../../interfaces/menu-item.interface';
import { AuthService } from '../../../service/auth.service';
import {Router} from '@angular/router';



@Component({
  selector: 'exp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('checkboxTemplate') checkboxTemplate: ElementRef;
  @ViewChild('backdropTemplate') backdropTemplate: ElementRef;

  public linkId = 0;
  public isMenuOpened: boolean;

  public countries!: any;  // '!' mean that variable will be initialized in another function (scope)
  public countriesName: any;

  links: MenuItemInterface[] = [
    { path: '/welcome', label: 'Main Page', active: 'button-active', icon: 'home', id: 0 },
    { path: '/films', label: 'All Films', active: 'button-active', icon: 'list_alt', id: 1 },
    { path: '/actors', label: 'All Actors', active: 'button-active', icon: 'face', id: 2 },
    { path: '/favorite-films', label: 'Favorite', active: 'button-active', icon: 'stars', id: 3 }
  ];

  constructor(
    private renderer: Renderer2,
    private authService: AuthService,
    public translate: TranslateService,
    private router: Router
  ) {

    this.countries = {
        ukr: './../../../../assets/images/ukr.svg',
        eng: './../../../../assets/images/eng.svg',
        ger: './../../../../assets/images/ger.svg'
    };

    this.countriesName = {
      ukr: 'UKR',
      eng: 'ENG',
      ger: 'GER'
    };

    translate.addLangs(['ukr', 'eng', 'ger']);
    translate.setDefaultLang('ukr');
  }

  public ngOnInit(): void {
  }

  public switchLanguage(lang: string): void {
    this.translate.use(lang);
  }

  public chooseLink(id: number): void {
    this.linkId = id;
    this.hideMenuAndBackdrop();
  }

  public backdrop(event: MouseEvent): void {
    event.preventDefault();

    this.hideMenuAndBackdrop();
    this.isMenuOpened = !this.isMenuOpened;
  }

  public menuClick(): void {
    this.checkboxTemplate.nativeElement.checked ?
      this.renderer.setStyle(this.backdropTemplate.nativeElement, 'display', 'block')
      : this.renderer.setStyle(this.backdropTemplate.nativeElement, 'display', 'none');
  }

  public login(): void {
    this.router.navigate(['/login']);
  }

  public logout(): void {
    this.authService.logout();
  }

  private hideMenuAndBackdrop(): void {
    this.checkboxTemplate.nativeElement.checked = false;
    this.renderer.setStyle(this.backdropTemplate.nativeElement, 'display', 'none');
  }
}
