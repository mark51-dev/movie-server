import { AuthGuard } from './../shared/auth.guard';
import { MovieEntity } from './entities/movie.entity';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movie')
@UseGuards(AuthGuard)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('all')
  async fetchAllMovies(): Promise<MovieEntity[]> {
    return (await this.movieService.findAll()).map((item) => {
      return {
        ...item,
        countries: item.countries.map((mapItem) => JSON.parse(mapItem).country),
        genres: item.genres.map((mapItem) => JSON.parse(mapItem).genre),
      };
    });
  }

  @Get(':id')
  async fetchMovieDetails(
    @Param('id') movieIdByKP: string,
  ): Promise<MovieEntity> {
    const movie = await this.movieService.findOneMovieByKPId(movieIdByKP);
    return {
      ...movie,
      countries: movie.countries.map((item) => JSON.parse(item).country),
      genres: movie.genres.map((item) => JSON.parse(item).genre),
    };
  }

  @Get('search/:search')
  async fetchMoviesBySearch(
    @Param('search') searchValue: string,
  ): Promise<MovieEntity[]> {
    return (await this.movieService.fetchMoviesBySearch(searchValue)).map(
      (item) => {
        return {
          ...item,
          countries: item.countries.map(
            (mapItem) => JSON.parse(mapItem).country,
          ),
          genres: item.genres.map((mapItem) => JSON.parse(mapItem).genre),
        };
      },
    );
  }

  @Get('all/pagination')
  async fetchMoviesByLimit(
    @Query('page') page: string,
  ): Promise<{ items: MovieEntity[]; count: number }> {
    const moviesAndCount = await this.movieService.fetchMoviesByLimit(page);
    const itemsRes = moviesAndCount.items.map((item) => {
      return {
        ...item,
        countries: item.countries.map((mapItem) => JSON.parse(mapItem).country),
        genres: item.genres.map((mapItem) => JSON.parse(mapItem).genre),
      };
    });
    return {
      items: itemsRes,
      count: moviesAndCount.count,
    };
  }
}
