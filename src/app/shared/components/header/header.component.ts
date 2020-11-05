import { Component } from '@angular/core';

import { MenuItemInterface } from '../../interfaces/menu-item.interface';

@Component({
  selector: 'exp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public linkId = 0;

  links: MenuItemInterface[] = [
    { path: '/welcome', label: 'Main Page', active: 'button-active', icon: 'home', id: 0 },
    { path: '/films', label: 'All Films', active: 'button-active', icon: 'list_alt', id: 1 },
    { path: '/actors', label: 'All Actors', active: 'button-active', icon: 'face', id: 2 },
    { path: '/favorite-films', label: 'Favorite', active: 'button-active', icon: 'stars', id: 3 }
  ];

  public chooseLink(id: number): void {
    this.linkId = id;
  }
}
