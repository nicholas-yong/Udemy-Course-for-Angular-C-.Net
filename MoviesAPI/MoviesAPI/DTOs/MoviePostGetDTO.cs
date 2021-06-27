using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.DTOs
{
    public class MoviePostGetDTO
    {
        public List<GenreDTO> genres { get; set; }

        public List<MovieTheaterDTO> theaters { get; set; }
    }
}
