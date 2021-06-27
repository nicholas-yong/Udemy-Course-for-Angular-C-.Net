import { Component, OnInit } from '@angular/core';
import { genreDTO } from '../genres.model';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-index-genres',
  templateUrl: './index-genres.component.html',
  styleUrls: ['./index-genres.component.css']
})
export class IndexGenresComponent implements OnInit {

  genres: genreDTO[] = [];
  columnsToDisplay = ['name', 'actions']

  constructor( private genreServices: GenresService  ){ }

  ngOnInit(): void {
    this.loadGenres();
  }

  loadGenres()
  {
    this.genreServices.getAll().subscribe(genres =>
      {
        this.genres = genres;
      });
  }

  delete( id: number)
  {
    this.genreServices.delete(id).subscribe( () =>
    {
      this.loadGenres();
    });
  }

}
