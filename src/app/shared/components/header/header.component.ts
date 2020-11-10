import { Component, OnInit } from '@angular/core';

import { MenuItemInterface } from '../../interfaces/menu-item.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'exp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public linkId = 0;
  public isLogged: boolean;

  links: MenuItemInterface[] = [
    { path: '/welcome', label: 'Main Page', active: 'button-active', icon: 'home', id: 0 },
    { path: '/films', label: 'All Films', active: 'button-active', icon: 'list_alt', id: 1 },
    { path: '/actors', label: 'All Actors', active: 'button-active', icon: 'face', id: 2 },
    { path: '/favorite-films', label: 'Favorite', active: 'button-active', icon: 'stars', id: 3 },
    { path: '/login', label: 'LogIn', active: 'button-active', icon: 'login', id: 4 },
    { path: '/logout', label: 'LogOut', active: 'button-active', icon: '', id: 5 }
  ];

  constructor(private authService: AuthService) {
  }

  public ngOnInit(): void {
    this.isLogged = this.authService.isLoggedIn();
  }

  public chooseLink(id: number): void {
    this.linkId = id;
  }
}
