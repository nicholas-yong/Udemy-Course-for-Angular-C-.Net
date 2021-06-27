import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatDateFormDate } from '../utilities/utils';
import { homeDTO, movieCreationDTO, movieDTO, MoviePostGetDTO, MoviePutGetDTO } from './movies.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + '/movies';

  public postGet(): Observable<MoviePostGetDTO>
  {
    return this.http.get<MoviePostGetDTO>(`${this.apiURL}/PostGet`)
  }

  public getHomePageMovies(): Observable<homeDTO>
  {
    return this.http.get<homeDTO>(this.apiURL);
  }

  public create(movieCreationDTO: movieCreationDTO): Observable<any>
  {
    console.log(movieCreationDTO)
    const formData = this.buildFormData(movieCreationDTO)
    return this.http.post(this.apiURL, formData);
  }

  public filter( values: any ): Observable<any>
  {
    const params = new HttpParams( {fromObject: values});
    return this.http.get<movieDTO[]>(`${this.apiURL}/filter`, {params, observe: 'response'});
  }

  public delete( id: number)
  {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  public getByID( id: number): Observable<movieDTO>
  {
    return this.http.get<movieDTO>(`${this.apiURL}/${id}`)
  }

  public putGet(id: number): Observable<MoviePutGetDTO>
  {
    return this.http.get<MoviePutGetDTO>(`${this.apiURL}/putget/${id}`);
  }

  public edit (id: number, movieCreationDTO: movieCreationDTO)
  {
    const formData = this.buildFormData(movieCreationDTO);
    return this.http.put(`${this.apiURL}/${id}`, formData)
  }

  private buildFormData(movie:movieCreationDTO): FormData
  {
    const formData = new FormData();

    formData.append('title', movie.title);
    formData.append('trailer', movie.trailer);
    formData.append('summary', movie.summary);
    formData.append('inTheaters', String(movie.inTheaters));
    if(movie.releaseDate)
    {
      formData.append('ReleaseDate', formatDateFormDate(movie.releaseDate));
    }
    if(movie.poster)
    {
      formData.append('poster', movie.poster);
    }

    formData.append('genreIds', JSON.stringify(movie.genreIds));
    formData.append('movieTheaterIds', JSON.stringify(movie.movieTheatersIds));
    formData.append('actors', JSON.stringify(movie.actors));

    return formData;

  }
}
