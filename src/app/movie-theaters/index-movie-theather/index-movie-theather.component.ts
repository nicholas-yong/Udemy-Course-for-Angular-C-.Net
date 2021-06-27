import { Component, OnInit } from '@angular/core';
import { movieCreationDTO } from 'src/app/movies/movies.model';
import { movieTheatersDTO } from '../movie-theaters.model';
import { MovieTheatersService } from '../movie-theaters.service';

@Component({
  selector: 'app-index-movie-theather',
  templateUrl: './index-movie-theather.component.html',
  styleUrls: ['./index-movie-theather.component.css']
})
export class IndexMovieTheatherComponent implements OnInit {

  constructor( private movieTheaterService: MovieTheatersService) { }

  movieTheaters: movieTheatersDTO[] = [];
  columnsToDisplay = ['name', 'actions']

  ngOnInit(): void {
    this.loadData();
  }

  loadData()
  {
    this.movieTheaterService.get().subscribe( movieTheaters =>
      {
        this.movieTheaters = movieTheaters;
      });
  }

  delete( id: number )
  {
    this.movieTheaterService.delete(id).subscribe(() =>
    {
      this.loadData();
    });
  }




}
