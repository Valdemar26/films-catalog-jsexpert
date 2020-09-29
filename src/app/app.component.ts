import { Component } from '@angular/core';

@Component({
  selector: 'exp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  links: object[] = [
    { path: '/main', label: 'Main Page', active: 'button-active', icon: 'home'},
    { path: '/films', label: 'All Films', active: 'button-active', icon: 'list_alt'}
  ];

}
