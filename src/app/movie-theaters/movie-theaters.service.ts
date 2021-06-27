import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { movieTheatersCreationDTO, movieTheatersDTO } from './movie-theaters.model';

@Injectable({
  providedIn: 'root'
})
export class MovieTheatersService {

  constructor(private http: HttpClient) {
   }

   private apiURL = environment.apiURL + '/movieTheaters';

   public create( movieTheatersCreationDTO: movieTheatersCreationDTO )
   {
     return this.http.post(this.apiURL, movieTheatersCreationDTO);
   }

   public get(): Observable<movieTheatersDTO[]>
   {
     return this.http.get<movieTheatersDTO[]>(this.apiURL);
   }

   public getByID( id: number): Observable<movieTheatersDTO>
   {
     return this.http.get<movieTheatersDTO>(`${this.apiURL}/${id}`);
   }

   public edit( id:number, movieTheatersDTO: movieTheatersCreationDTO )
   {
     return this.http.put(`${this.apiURL}/${id}`, movieTheatersDTO );
   }

   public delete(id: number)
   {
     return this.http.delete(`${this.apiURL}/${id}`);
   }
}
