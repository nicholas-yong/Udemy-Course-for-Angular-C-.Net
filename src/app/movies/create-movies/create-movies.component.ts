import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { movieCreationDTO } from '../movies.model';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-create-movies',
  templateUrl: './create-movies.component.html',
  styleUrls: ['./create-movies.component.css']
})
export class CreateMoviesComponent implements OnInit {

  constructor(private moviesService: MoviesService, private router: Router) { }

  nonSelectedGenres: multipleSelectorModel[];
  nonSelectedMovieTheaters: multipleSelectorModel[];


  ngOnInit(): void {
    this.moviesService.postGet().subscribe( response =>
      {
        console.log( response );
        this.nonSelectedMovieTheaters = response.theaters.map( movieTheater =>
          {
            return <multipleSelectorModel> { key: movieTheater.id, value: movieTheater.name}
          });
        this.nonSelectedGenres = response.genres.map( genres =>
          {
            return <multipleSelectorModel> { key: genres.id, value: genres.name}
          });
      });
  }

  saveChanges( movieCreationDTO: movieCreationDTO)
  {
    console.log(movieCreationDTO);
    this.moviesService.create(movieCreationDTO).subscribe( id =>
    {
      this.router.navigate(['/movies/' + id]);
    });
  }
}
