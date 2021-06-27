using AutoMapper;
using Microsoft.AspNetCore.Identity;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.Helpers
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile(GeometryFactory geometryFactory)
        {
            CreateMap<GenreDTO, Genre>().ReverseMap();
            CreateMap<GenreCreationDTO, Genre>();
            CreateMap<ActorDTO, Actor>().ReverseMap();
            CreateMap<ActorCreationDTO, Actor>().ForMember(x => x.Picture, options => options.Ignore());

            CreateMap<MovieTheater, MovieTheaterDTO>().ForMember(x => x.Latitude, dto => dto.MapFrom(prop => prop.Location.Y)).ForMember(x => x.Longitude, dto => dto.MapFrom(prop => prop.Location.X));

            CreateMap<MovieTheaterCreationDTO, MovieTheater>().ForMember(x => x.Location, x => x.MapFrom(dto => geometryFactory.CreatePoint(new Coordinate(dto.Longitude, dto.Latitude))));
            CreateMap<MovieCreationDTO, Movie>().
                ForMember(x => x.Poster, options => options.Ignore()).
                ForMember(x => x.MoviesGenres, options => options.MapFrom(MapMovieGenres)).
                ForMember(x => x.MovieMovieTheaters, options => options.MapFrom(MapMovieTheatersMovie)).
                ForMember(x => x.MoviesActors, options => options.MapFrom(MapMovieActors));

            CreateMap<Movie, MovieDTO>()
               .ForMember(x => x.Genres, options => options.MapFrom(MapMoviesGenres))
              .ForMember(x => x.MovieTheaters, options => options.MapFrom(MapMovieTheatersMovies))
              .ForMember(x => x.Actors, options => options.MapFrom(MapMoviesActors));

            CreateMap<IdentityUser, UserDTO>();
        }

        private List<GenreDTO> MapMoviesGenres(Movie movie, MovieDTO moviedto)
        {
            var result = new List<GenreDTO>();

            if (movie.MoviesGenres != null)
            {
                foreach (var genre in movie.MoviesGenres)
                {
                    result.Add(new GenreDTO() { Id = genre.Genre.Id, Name = genre.Genre.Name });

                }
            }

            return result;
        }

        private List<MovieTheaterDTO> MapMovieTheatersMovies(Movie movie, MovieDTO moviedto)
        {
            var result = new List<MovieTheaterDTO>();

            if (movie.MovieMovieTheaters != null)
            {
                foreach (var movieTheater in movie.MovieMovieTheaters)
                {
                    result.Add(new MovieTheaterDTO() { Id = movieTheater.MovieTheater.id, Name = movieTheater.MovieTheater.Name, Latitude = movieTheater.MovieTheater.Location.Y, Longitude = movieTheater.MovieTheater.Location.X });

                }
            }

            return result;
        }

        private List<ActorsMovieDTO> MapMoviesActors(Movie movie, MovieDTO moviedto)
        {
            var result = new List<ActorsMovieDTO>();

            if (movie.MoviesActors != null)
            {
                foreach (var actor in movie.MoviesActors)
                {
                    result.Add(new ActorsMovieDTO()
                    {
                        Id = actor.Actor.Id,
                        Name = actor.Actor.Name,
                        Character = actor.Character,
                        Picture = actor.Actor.Picture,
                        Order = actor.Order
                    });
                }
            }

            return result;
        }

        private List<MoviesGenres> MapMovieGenres(MovieCreationDTO movieCreationDTO, Movie movie)
        {
            var result = new List<MoviesGenres>();

            if(movieCreationDTO.GenreIds == null)
            {
                return result;
            }

            foreach( var id in movieCreationDTO.GenreIds )
            {
                result.Add(new MoviesGenres() { GenreId = id });
            }

            return result;
        }

        private List<MovieTheatersMovies> MapMovieTheatersMovie(MovieCreationDTO movieCreationDTO, Movie movie)
        {
            var result = new List<MovieTheatersMovies>();

            if (movieCreationDTO.MovieTheaterIds == null)
            {
                return result;
            }

            foreach (var id in movieCreationDTO.MovieTheaterIds)
            {
                result.Add(new MovieTheatersMovies() { MovieTheaterId = id });
            }

            return result;
        }

        private List<MoviesActors> MapMovieActors(MovieCreationDTO movieCreationDTO, Movie movie)
        {
            var result = new List<MoviesActors>();

            if (movieCreationDTO.Actors == null)
            {
                return result;
            }

            foreach (var actor in movieCreationDTO.Actors)
            {
                result.Add(new MoviesActors() { ActorId = actor.Id, Character = actor.Character });
            }

            return result;
        }

    }
}
