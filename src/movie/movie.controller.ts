import { Controller, Get, Param } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('all')
  fetchAllMovies() {
    return this.movieService.findAll();
  }

  @Get(':id')
  fetchMovieDetails(@Param('id') movieIdByKP: string) {
    return this.movieService.findOneMovieByKPId(movieIdByKP);
  }
}
