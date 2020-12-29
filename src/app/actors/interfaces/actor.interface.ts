import { ActorListInterface } from './actor-list.interface';


export interface ActorInterface {
  page: number;
  total_results: number;
  total_pages: number;
  results: ActorListInterface[];
}
