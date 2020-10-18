import { Component, Input, OnInit } from '@angular/core';
import { FilmListInterface } from '../../../films/interfaces/film-list.interface';

@Component({
  selector: 'exp-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() filmDetail: FilmListInterface;

  constructor() { }

  ngOnInit(): void {
  }

}
