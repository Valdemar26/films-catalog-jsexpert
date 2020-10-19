import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'exp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  links: object[] = [
    { path: '/welcome', label: 'Main Page', active: 'button-active', icon: 'home'},
    { path: '/films', label: 'All Films', active: 'button-active', icon: 'list_alt'},
    { path: '/actors', label: 'All Actors', active: 'button-active', icon: 'face'},
    { path: '/favorite-films', label: 'Favorite', active: 'button-active', icon: 'stars'}
  ];

}
