import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from './entities/movie.entity';
import { VideoCdnMovieEntity } from './entities/videoCdnMovie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(VideoCdnMovieEntity)
    private readonly videoCdnMovieEntity: Repository<VideoCdnMovieEntity>,
  ) {}

  async findOneMovieByKPId(kpMovieId: string) {
    return this.movieRepository.findOneBy({
      kinopoiskId: parseInt(kpMovieId),
    });
  }

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find();
  }
}
