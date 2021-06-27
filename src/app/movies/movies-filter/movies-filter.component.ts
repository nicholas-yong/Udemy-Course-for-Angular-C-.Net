import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { genreDTO } from 'src/app/genres/genres.model';
import { GenresService } from 'src/app/genres/genres.service';
import { movieDTO } from '../movies.model';
import { MoviesService } from '../movies.service';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-movies-filter',
  templateUrl: './movies-filter.component.html',
  styleUrls: ['./movies-filter.component.css']
})

export class MoviesFilterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private moviesService: MoviesService, private genresService: GenresService, private location: Location, private activatedRoute: ActivatedRoute) { }

  form: FormGroup;

  genres: genreDTO[];

  movies: movieDTO[];

  currentPage = 1;
  recordsPerPage = 10;

  initialFormValues: any;
  totalAmountOfRecords;


  ngOnInit(): void
  {
    this.form = this.formBuilder.group({
      title: '',
      genreId: 0,
      upcomingReleases: false,
      inTheaters: false
    });

    this.initialFormValues = this.form.value;
    this.readParametersFromURL();

    this.genresService.getAll().subscribe( genres =>
      {
        this.genres = genres
        console.log(this.form.value);
        this.filterMovies(this.form.value);

        this.form.valueChanges.subscribe( values =>
        {
            this.filterMovies( values )
            this.writeParametersInURL();
        });
      });
  }

  private writeParametersInURL()
  {
    const queryStringsArray = [];

    const formValues = this.form.value;

    if(formValues.title)
    {
        queryStringsArray.push(`title=${formValues.title}`);
    }

    if(formValues.genreId)
    {
        queryStringsArray.push(`genreId=${formValues.genreId}`);
    }

    if(formValues.upcomingReleases)
    {
        queryStringsArray.push(`upcomingReleases=${formValues.upcomingReleases}`);
    }

    if(formValues.inTheaters)
    {
        queryStringsArray.push(`inTheaters=${formValues.inTheaters}`);
    }

    queryStringsArray.push(`page=${this.currentPage}`);
    queryStringsArray.push(`recordsPerPage=${this.recordsPerPage}`);
    this.location.replaceState( 'movies/filter', queryStringsArray.join('&'));
  }

  filterMovies( values: any )
  {
    values.page = this.currentPage;
    values.recordsPerPage = this.recordsPerPage;
    this.moviesService.filter( values ).subscribe((response: HttpResponse<movieDTO[]>) =>
    {
      this.movies = response.body;
      this.totalAmountOfRecords = response.headers.get("totalAmountOfRecords");
    });
  }

  private readParametersFromURL()
  {
    this.activatedRoute.queryParams.subscribe( params =>
      {
        var obj: any = [];
        if(params.title)
        {
          obj.title = params.title;
        }

        if(params.genreId)
        {
          obj.genreId = params.genreId;
        }

        if(params.upcomingReleases)
        {
          obj.upcomingReleases = params.upcomingReleases;
        }

        if(params.inTheaters)
        {
          obj.inTheaters = params.inTheaters;
        }

        if(params.page)
        {
          this.currentPage = params.page;
        }

        if(params.recordsPerPage)
        {
          this.recordsPerPage = params.recordsPerPage;
        }

        this.form.patchValue(obj);
      });
  }

  paginatorUpdate(event: PageEvent)
  {
    this.currentPage = event.pageIndex + 1;
    this.recordsPerPage = event.pageSize;
    this.filterMovies(this.form.value);
    this.writeParametersInURL();
  }

  clearForm()
  {
    this.form.patchValue(this.initialFormValues);
  }

  onDelete()
  {
    this.filterMovies(this.form.value);
  }

}
