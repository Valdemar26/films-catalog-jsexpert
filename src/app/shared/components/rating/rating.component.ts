import { Component, Input, OnInit } from '@angular/core';
import {FilmInterface} from '../../../films/interfaces/film.interface';

@Component({
  selector: 'exp-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() filmDetail: FilmInterface;

  constructor() { }

  ngOnInit(): void {
  }

}
