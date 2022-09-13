import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { MovieEntity } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async findOneMovieByKPId(kpMovieId: string) {
    return await this.movieRepository.findOneBy({
      kinopoiskId: parseInt(kpMovieId),
    });
  }

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find();
  }

  async fetchMoviesBySearch(searchValue: string): Promise<MovieEntity[]> {
    return await this.movieRepository.findBy({
      nameRu: ILike(`%${searchValue}%`),
    });
  }

  async fetchMoviesByLimit(
    offset: string,
  ): Promise<{ items: MovieEntity[]; count: number }> {
    const [items, count] = await this.movieRepository.findAndCount({
      skip: parseInt(offset),
      take: 25,
    });
    return {
      items,
      count,
    };
  }
}
