import { Component, Input, OnInit } from '@angular/core';

import { FilmInterface } from '../../interfaces/film.interface';

@Component({
  selector: 'exp-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.scss']
})
export class FilmItemComponent implements OnInit {

  @Input() film: FilmInterface;

  constructor() { }

  public ngOnInit(): void {}

}
