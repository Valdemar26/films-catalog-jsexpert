import { FilmListInterface } from './film-list.interface';

export interface FilmInterface {
  page: number;
  total_results: number;
  total_pages: number;
  results: FilmListInterface[];
}
