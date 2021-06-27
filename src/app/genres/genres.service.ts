import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { genreCreationDTO, genreDTO } from './genres.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor( private http : HttpClient) { }

  private apiURL = environment.apiURL + '/genres'

  getAll() : Observable<genreDTO[]>
  {
    return this.http.get<genreDTO[]>(this.apiURL);
  }

  create( genre:genreCreationDTO )
  {
    return this.http.post(this.apiURL, genre );
  }

  getById(id: number ): Observable<genreDTO>
  {
    return this.http.get<genreDTO>(`${this.apiURL}/${id}`);
  }

  edit( id: number, genre: genreCreationDTO)
  {
    return this.http.put(`${this.apiURL}/${id}`, genre );
  }

  delete( id:number)
  {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
