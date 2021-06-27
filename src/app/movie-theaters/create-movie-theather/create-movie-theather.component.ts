import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieTheaterFormComponent } from '../movie-theater-form/movie-theater-form.component';
import { movieTheatersCreationDTO } from '../movie-theaters.model';
import { MovieTheatersService } from '../movie-theaters.service';

@Component({
  selector: 'app-create-movie-theather',
  templateUrl: './create-movie-theather.component.html',
  styleUrls: ['./create-movie-theather.component.css']
})
export class CreateMovieTheatherComponent implements OnInit {

  constructor(private movieTheaterService: MovieTheatersService, private router: Router) { }

  ngOnInit(): void {
  }

  saveChanges(movieTheater: movieTheatersCreationDTO)
  {
    this.movieTheaterService.create( movieTheater ).subscribe( () =>
    {
      this.router.navigate(['/movietheaters']);
    });
  }

}
