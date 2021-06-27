import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatDateFormDate } from '../utilities/utils';
import { actorCreationDTO, actorDTO, actorsMovieDTO } from './actors.model';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl = environment.apiURL + '/actors'

  create( actor: actorCreationDTO)
  {
      const formData = this.buildFormData(actor);
      return this.httpClient.post( this.apiUrl, formData)
  }

  private buildFormData(actor: actorCreationDTO): FormData
  {
    const formData = new FormData();

    formData.append( 'name', actor.name );

    if(actor.biography)
    {
      formData.append( 'biography', actor.biography );
    }

    if(actor.dateOfBirth)
    {
      formData.append( 'dateOfBirth', formatDateFormDate(actor.dateOfBirth) );
    }

    if(actor.picture)
    {
      formData.append( 'picture', actor.picture );
    }

    return formData;
  }

  get( page:number,  recordsPerPage: number): Observable<any>
  {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', recordsPerPage.toString());
    return this.httpClient.get<actorDTO[]>(this.apiUrl, {observe: 'response', params});
  }

  getByID( id: number): Observable<actorDTO>
  {
    return this.httpClient.get<actorDTO>(`${this.apiUrl}/${id}`);
  }

  edit( id:number, actor: actorCreationDTO )
  {
    const formData = this.buildFormData(actor);
    return this.httpClient.put(`${this.apiUrl}/${id}`, formData);
  }

  delete( id: number)
  {
    return this.httpClient.delete<actorDTO>( `${this.apiUrl}/${id}`);
  }

  searchByName( name: string ): Observable<actorsMovieDTO[]>
  {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.httpClient.post<actorsMovieDTO[]>(`${this.apiUrl}/searchByName`, JSON.stringify(name), {headers} );

  }
}
